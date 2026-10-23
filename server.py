#!/usr/bin/env python3
"""Small same-origin website and private application-submission API."""

from __future__ import annotations

import email.policy
import json
import logging
import os
import re
import secrets
import smtplib
import sqlite3
import ssl
import threading
import time
import unicodedata
import zipfile
from datetime import datetime, timezone
from contextlib import closing
from email.message import EmailMessage
from email.parser import BytesParser
from http import HTTPStatus
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from io import BytesIO
from pathlib import Path
from urllib.parse import urlsplit
from uuid import uuid4


ROOT = Path(__file__).resolve().parent
DEFAULT_DATA_DIR = Path.home() / ".local" / "share" / "voloshyn-personal"
DATA_DIR = Path(os.environ.get("DATA_DIR", DEFAULT_DATA_DIR)).expanduser().resolve()
DATABASE_PATH = DATA_DIR / "applications.sqlite3"
UPLOADS_DIR = DATA_DIR / "uploads"
JOBS_FILE = Path(os.environ.get("JOBS_FILE", ROOT / "jobs.json")).expanduser().resolve()
SITE_CONFIG_FILE = Path(os.environ.get("SITE_CONFIG_FILE", ROOT / "site-config.json")).expanduser().resolve()
MAX_REQUEST_BYTES = 10 * 1024 * 1024
MAX_RESUME_BYTES = 8 * 1024 * 1024
ALLOWED_DIRECTIONS = {"", "production", "logistics", "automotive", "hospitality", "other"}
RATE_LIMIT_WINDOW = 10 * 60
RATE_LIMIT_COUNT = 5
SUBMISSIONS_BY_IP: dict[str, list[float]] = {}
RATE_LIMIT_LOCK = threading.Lock()
LOG = logging.getLogger("voloshyn")


class RequestError(Exception):
    def __init__(self, status: HTTPStatus, code: str):
        super().__init__(code)
        self.status = status
        self.code = code


def initialize_storage() -> None:
    DATA_DIR.mkdir(mode=0o700, parents=True, exist_ok=True)
    UPLOADS_DIR.mkdir(mode=0o700, parents=True, exist_ok=True)
    os.chmod(DATA_DIR, 0o700)
    os.chmod(UPLOADS_DIR, 0o700)
    with closing(sqlite3.connect(DATABASE_PATH)) as connection:
        connection.execute(
            """
            CREATE TABLE IF NOT EXISTS applications (
                id TEXT PRIMARY KEY,
                name TEXT NOT NULL,
                phone TEXT NOT NULL,
                email TEXT,
                comment TEXT NOT NULL,
                desired_direction TEXT NOT NULL,
                vacancy_id TEXT,
                resume_path TEXT,
                consent_at TEXT NOT NULL,
                submitted_at TEXT NOT NULL
            )
            """
        )
        connection.commit()
    os.chmod(DATABASE_PATH, 0o600)


def load_active_jobs() -> list[dict]:
    try:
        with JOBS_FILE.open("r", encoding="utf-8") as jobs_file:
            jobs = json.load(jobs_file)
    except FileNotFoundError:
        LOG.error("Vacancy data file is missing.")
        raise
    except (json.JSONDecodeError, OSError):
        LOG.exception("Unable to read vacancy data.")
        raise
    if not isinstance(jobs, list):
        raise ValueError("Vacancy data must be a JSON array.")
    active_jobs = []
    for job in jobs:
        if not isinstance(job, dict) or not isinstance(job.get("id"), str):
            raise ValueError("Every vacancy must have a string ID.")
        if not (job.get("active") is True or job.get("status") == "active"):
            continue
        expiration = job.get("expiresAt")
        if expiration:
            try:
                expires_at = datetime.fromisoformat(str(expiration).replace("Z", "+00:00"))
                if expires_at.tzinfo is None:
                    expires_at = expires_at.replace(tzinfo=timezone.utc)
                if expires_at < datetime.now(timezone.utc):
                    continue
            except (TypeError, ValueError) as error:
                raise ValueError("Vacancy expiry dates must be valid ISO 8601 timestamps.") from error
        active_jobs.append(job)
    return active_jobs


def validate_resume(filename: str, payload: bytes) -> str:
    suffix = Path(filename).suffix.lower()
    if not payload or len(payload) > MAX_RESUME_BYTES or suffix not in {".pdf", ".docx"}:
        raise RequestError(HTTPStatus.BAD_REQUEST, "invalid_file")
    if suffix == ".pdf":
        if not payload[:1024].lstrip().startswith(b"%PDF-"):
            raise RequestError(HTTPStatus.BAD_REQUEST, "invalid_file")
        return ".pdf"
    try:
        with zipfile.ZipFile(BytesIO(payload)) as document:
            entries = document.infolist()
            names = {entry.filename for entry in entries}
            if (
                len(entries) > 4000
                or "[Content_Types].xml" not in names
                or "word/document.xml" not in names
                or any(entry.file_size > 25 * 1024 * 1024 for entry in entries)
                or any(entry.filename.lower().endswith("vbaproject.bin") for entry in entries)
            ):
                raise RequestError(HTTPStatus.BAD_REQUEST, "invalid_file")
    except (zipfile.BadZipFile, OSError):
        raise RequestError(HTTPStatus.BAD_REQUEST, "invalid_file") from None
    return ".docx"


def _clean_text(value: str, maximum: int) -> str:
    return "".join(
        character for character in value.strip()
        if character in "\n\t" or unicodedata.category(character) != "Cc"
    )[:maximum]


def validate_submission(fields: dict[str, str], resume: tuple[str, bytes] | None) -> dict[str, str | tuple[str, bytes] | None]:
    name = _clean_text(fields.get("name", ""), 120)
    phone = _clean_text(fields.get("phone", ""), 30)
    email_address = _clean_text(fields.get("email", ""), 254)
    comment = _clean_text(fields.get("comment", ""), 2000)
    direction = fields.get("direction", "").strip()
    vacancy_id = fields.get("vacancy_id", "").strip()
    if len(name) < 2 or not re.search(r"\d", phone) or not 7 <= len(re.sub(r"\D", "", phone)) <= 18:
        raise RequestError(HTTPStatus.BAD_REQUEST, "invalid_submission")
    if email_address and not re.fullmatch(r"[^\s@]+@[^\s@]+\.[^\s@]+", email_address):
        raise RequestError(HTTPStatus.BAD_REQUEST, "invalid_submission")
    if direction not in ALLOWED_DIRECTIONS or len(vacancy_id) > 128 or fields.get("consent") != "true":
        raise RequestError(HTTPStatus.BAD_REQUEST, "invalid_submission")
    if vacancy_id and not any(job.get("id") == vacancy_id for job in load_active_jobs()):
        raise RequestError(HTTPStatus.BAD_REQUEST, "vacancy_unavailable")
    resume_extension = None
    if resume:
        filename, payload = resume
        resume_extension = validate_resume(filename, payload)
    return {
        "name": name,
        "phone": phone,
        "email": email_address or "",
        "comment": comment,
        "direction": direction,
        "vacancy_id": vacancy_id or "",
        "resume": (secrets.token_hex(24) + resume_extension, resume[1]) if resume and resume_extension else None,
    }


def save_application(application: dict[str, str | tuple[str, bytes] | None]) -> str:
    application_id = uuid4().hex
    submitted_at = datetime.now(timezone.utc).isoformat()
    resume_path = None
    stored_file = None
    resume = application["resume"]
    if resume:
        filename, payload = resume
        stored_file = UPLOADS_DIR / filename
    try:
        if resume:
            with stored_file.open("xb") as file_handle:
                os.chmod(stored_file, 0o600)
                file_handle.write(payload)
            resume_path = f"uploads/{filename}"
        with closing(sqlite3.connect(DATABASE_PATH, timeout=10)) as connection:
            connection.execute(
                """
                INSERT INTO applications
                    (id, name, phone, email, comment, desired_direction, vacancy_id,
                     resume_path, consent_at, submitted_at)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                """,
                (
                    application_id,
                    application["name"],
                    application["phone"],
                    application["email"],
                    application["comment"],
                    application["direction"],
                    application["vacancy_id"] or None,
                    resume_path,
                    submitted_at,
                    submitted_at,
                ),
            )
            connection.commit()
    except Exception:
        if stored_file:
            stored_file.unlink(missing_ok=True)
        raise

    notify_application(application_id, application["vacancy_id"])
    return application_id


def notify_application(application_id: str, vacancy_id: str | None) -> None:
    settings = {
        "host": os.environ.get("SMTP_HOST", "").strip(),
        "port": os.environ.get("SMTP_PORT", "587").strip(),
        "sender": os.environ.get("SMTP_FROM", "").strip(),
        "recipient": os.environ.get("APPLICATIONS_EMAIL", "").strip(),
    }
    if not all(settings.values()):
        return
    try:
        port = int(settings["port"])
        message = EmailMessage()
        message["Subject"] = "New Voloshyn Personal application"
        message["From"] = settings["sender"]
        message["To"] = settings["recipient"]
        message.set_content(
            f"A new application was saved.\nReference: {application_id}\n"
            f"Vacancy ID: {vacancy_id or 'not specified'}\n"
        )
        with smtplib.SMTP(settings["host"], port, timeout=10) as client:
            client.ehlo()
            if os.environ.get("SMTP_USE_TLS", "").lower() in {"1", "true", "yes"}:
                client.starttls(context=ssl.create_default_context())
                client.ehlo()
            username = os.environ.get("SMTP_USER", "")
            password = os.environ.get("SMTP_PASSWORD", "")
            if username or password:
                if not username or not password:
                    raise ValueError("Both SMTP_USER and SMTP_PASSWORD are required.")
                client.login(username, password)
            client.send_message(message)
    except (OSError, ValueError, smtplib.SMTPException):
        LOG.exception("Application %s was saved, but its email notification failed.", application_id)


def parse_multipart(content_type: str, body: bytes) -> tuple[dict[str, str], tuple[str, bytes] | None]:
    if not content_type.lower().startswith("multipart/form-data;"):
        raise RequestError(HTTPStatus.BAD_REQUEST, "invalid_content_type")
    try:
        message = BytesParser(policy=email.policy.default).parsebytes(
            f"Content-Type: {content_type}\r\nMIME-Version: 1.0\r\n\r\n".encode("ascii") + body
        )
    except (UnicodeEncodeError, ValueError):
        raise RequestError(HTTPStatus.BAD_REQUEST, "invalid_content_type") from None
    if not message.is_multipart():
        raise RequestError(HTTPStatus.BAD_REQUEST, "invalid_content_type")

    fields: dict[str, str] = {}
    resume = None
    for part in message.iter_parts():
        name = part.get_param("name", header="content-disposition")
        if not name:
            continue
        filename = part.get_filename()
        payload = part.get_payload(decode=True) or b""
        if filename:
            if name != "resume" or resume is not None:
                raise RequestError(HTTPStatus.BAD_REQUEST, "invalid_file")
            safe_filename = Path(filename.replace("\\", "/")).name
            resume = (safe_filename, payload)
        else:
            if name in fields or len(payload) > 4096:
                raise RequestError(HTTPStatus.BAD_REQUEST, "invalid_submission")
            charset = part.get_content_charset() or "utf-8"
            try:
                fields[name] = payload.decode(charset)
            except (LookupError, UnicodeDecodeError):
                raise RequestError(HTTPStatus.BAD_REQUEST, "invalid_submission") from None
    return fields, resume


def _rate_limit(client_address: str) -> bool:
    now = time.monotonic()
    with RATE_LIMIT_LOCK:
        recent = [stamp for stamp in SUBMISSIONS_BY_IP.get(client_address, []) if now - stamp < RATE_LIMIT_WINDOW]
        if len(recent) >= RATE_LIMIT_COUNT:
            SUBMISSIONS_BY_IP[client_address] = recent
            return False
        recent.append(now)
        SUBMISSIONS_BY_IP[client_address] = recent
        return True


class WebsiteHandler(BaseHTTPRequestHandler):
    server_version = "VoloshynPersonal"
    sys_version = ""

    def _send(self, status: HTTPStatus, payload: bytes, content_type: str, cache: str = "no-store") -> None:
        self.send_response(status)
        self.send_header("Content-Type", content_type)
        self.send_header("Content-Length", str(len(payload)))
        self.send_header("Cache-Control", cache)
        self.send_header("X-Content-Type-Options", "nosniff")
        self.send_header("Referrer-Policy", "strict-origin-when-cross-origin")
        self.send_header("Permissions-Policy", "camera=(), microphone=(), geolocation=()")
        self.send_header(
            "Content-Security-Policy",
            "default-src 'self'; img-src 'self' https://images.unsplash.com; "
            "style-src 'self' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; "
            "script-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'self'; "
            "form-action 'self'; frame-ancestors 'none'",
        )
        self.end_headers()
        self.wfile.write(payload)

    def _json(self, status: HTTPStatus, data: dict | list) -> None:
        self._send(status, json.dumps(data, ensure_ascii=False).encode("utf-8"), "application/json; charset=utf-8")

    def do_GET(self) -> None:
        path = urlsplit(self.path).path
        if path == "/api/jobs":
            try:
                self._json(HTTPStatus.OK, load_active_jobs())
            except (OSError, ValueError):
                self._json(HTTPStatus.INTERNAL_SERVER_ERROR, {"error": "jobs_unavailable"})
            return
        if path == "/api/config":
            try:
                with SITE_CONFIG_FILE.open("r", encoding="utf-8") as config_file:
                    config = json.load(config_file)
                if not isinstance(config, dict):
                    raise ValueError("Site config must be a JSON object.")
                public_config = {
                    key: str(config.get(key, ""))
                    for key in ("email", "phone", "instagram", "telegram")
                }
                self._json(HTTPStatus.OK, public_config)
            except (OSError, ValueError, json.JSONDecodeError):
                LOG.exception("Unable to read public contact settings.")
                self._json(HTTPStatus.INTERNAL_SERVER_ERROR, {"error": "config_unavailable"})
            return
        if path in {"/", "/jobs", "/index.html"}:
            self._serve_file(ROOT / "index.html", "text/html; charset=utf-8")
            return
        static_files = {
            "/styles.css": ("styles.css", "text/css; charset=utf-8"),
            "/app.js": ("app.js", "text/javascript; charset=utf-8"),
        }
        if path in static_files:
            filename, content_type = static_files[path]
            self._serve_file(ROOT / filename, content_type)
            return
        self._json(HTTPStatus.NOT_FOUND, {"error": "not_found"})

    def _serve_file(self, path: Path, content_type: str) -> None:
        try:
            payload = path.read_bytes()
        except OSError:
            self._json(HTTPStatus.INTERNAL_SERVER_ERROR, {"error": "asset_unavailable"})
            return
        self._send(HTTPStatus.OK, payload, content_type, "public, max-age=300")

    def do_POST(self) -> None:
        if urlsplit(self.path).path != "/api/applications":
            self._json(HTTPStatus.NOT_FOUND, {"error": "not_found"})
            return
        origin = self.headers.get("Origin")
        if origin:
            try:
                if urlsplit(origin).netloc.lower() != self.headers.get("Host", "").lower():
                    raise RequestError(HTTPStatus.FORBIDDEN, "origin_rejected")
            except ValueError:
                self._json(HTTPStatus.FORBIDDEN, {"error": "origin_rejected"})
                return
        if not _rate_limit(self.client_address[0]):
            self._json(HTTPStatus.TOO_MANY_REQUESTS, {"error": "rate_limited"})
            return
        try:
            content_length = int(self.headers.get("Content-Length", "0"))
        except ValueError:
            self._json(HTTPStatus.BAD_REQUEST, {"error": "invalid_request"})
            return
        if content_length <= 0:
            self._json(HTTPStatus.BAD_REQUEST, {"error": "invalid_request"})
            return
        if content_length > MAX_REQUEST_BYTES:
            self._json(HTTPStatus.REQUEST_ENTITY_TOO_LARGE, {"error": "request_too_large"})
            return

        try:
            fields, resume = parse_multipart(self.headers.get("Content-Type", ""), self.rfile.read(content_length))
            if fields.get("website", "").strip():
                self._json(HTTPStatus.BAD_REQUEST, {"error": "invalid_submission"})
                return
            application = validate_submission(fields, resume)
            save_application(application)
        except RequestError as error:
            self._json(error.status, {"error": error.code})
            return
        except (OSError, sqlite3.Error):
            LOG.exception("Unable to save an application.")
            self._json(HTTPStatus.INTERNAL_SERVER_ERROR, {"error": "save_failed"})
            return
        except Exception:
            LOG.exception("Unexpected application submission error.")
            self._json(HTTPStatus.INTERNAL_SERVER_ERROR, {"error": "save_failed"})
            return
        self._json(HTTPStatus.CREATED, {"saved": True})

    def log_message(self, format: str, *args: object) -> None:
        LOG.info("%s - %s", self.client_address[0], format % args)


def main() -> None:
    logging.basicConfig(level=os.environ.get("LOG_LEVEL", "INFO").upper())
    os.umask(0o077)
    initialize_storage()
    port = int(os.environ.get("PORT", "8000"))
    host = os.environ.get("HOST", "127.0.0.1")
    server = ThreadingHTTPServer((host, port), WebsiteHandler)
    server.daemon_threads = True
    LOG.info("Voloshyn Personal is listening on %s:%s.", host, port)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        LOG.info("Shutting down.")
    finally:
        server.server_close()


if __name__ == "__main__":
    main()
