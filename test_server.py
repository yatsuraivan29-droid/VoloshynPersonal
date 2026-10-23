import json
import sqlite3
import tempfile
import threading
import unittest
from contextlib import closing
from http.server import ThreadingHTTPServer
from pathlib import Path
from unittest.mock import patch
from urllib.error import HTTPError
from urllib.request import Request, urlopen

import server


class WebsiteAPITests(unittest.TestCase):
    def setUp(self):
        self.temporary_directory = tempfile.TemporaryDirectory()
        self.data_dir = Path(self.temporary_directory.name) / "private"
        self.jobs_file = Path(self.temporary_directory.name) / "jobs.json"
        self.jobs_file.write_text(
            json.dumps(
                [
                    {
                        "id": "current-offer",
                        "active": True,
                        "title": {"ua": "Працівник виробництва", "sk": "Operátor výroby"},
                    },
                    {"id": "old-offer", "active": False},
                ]
            ),
            encoding="utf-8",
        )
        self.patches = [
            patch.object(server, "DATA_DIR", self.data_dir),
            patch.object(server, "DATABASE_PATH", self.data_dir / "applications.sqlite3"),
            patch.object(server, "UPLOADS_DIR", self.data_dir / "uploads"),
            patch.object(server, "JOBS_FILE", self.jobs_file),
        ]
        for active_patch in self.patches:
            active_patch.start()
        server.SUBMISSIONS_BY_IP.clear()
        server.initialize_storage()
        self.httpd = ThreadingHTTPServer(("127.0.0.1", 0), server.WebsiteHandler)
        self.server_thread = threading.Thread(target=self.httpd.serve_forever, daemon=True)
        self.server_thread.start()
        self.base_url = f"http://127.0.0.1:{self.httpd.server_port}"

    def tearDown(self):
        self.httpd.shutdown()
        self.httpd.server_close()
        self.server_thread.join()
        for active_patch in reversed(self.patches):
            active_patch.stop()
        self.temporary_directory.cleanup()

    def multipart_request(self, fields, resume=None):
        boundary = "----VoloshynTestBoundary"
        body = bytearray()
        for name, value in fields.items():
            body.extend(
                f"--{boundary}\r\n"
                f'Content-Disposition: form-data; name="{name}"\r\n'
                "Content-Type: text/plain; charset=UTF-8\r\n\r\n".encode()
            )
            body.extend(value.encode("utf-8"))
            body.extend(b"\r\n")
        if resume:
            filename, payload = resume
            body.extend(
                f"--{boundary}\r\n"
                f'Content-Disposition: form-data; name="resume"; filename="{filename}"\r\n'
                "Content-Type: application/pdf\r\n\r\n".encode()
            )
            body.extend(payload)
            body.extend(b"\r\n")
        body.extend(f"--{boundary}--\r\n".encode())
        return Request(
            f"{self.base_url}/api/applications",
            data=bytes(body),
            headers={"Content-Type": f"multipart/form-data; boundary={boundary}"},
            method="POST",
        )

    def valid_fields(self, **overrides):
        fields = {
            "name": "Марія Коваленко",
            "phone": "+421 900 123 456",
            "email": "maria@example.com",
            "direction": "production",
            "comment": "Досвід роботи на виробництві",
            "vacancy_id": "current-offer",
            "consent": "true",
        }
        fields.update(overrides)
        return fields

    def test_application_is_saved_with_private_resume_and_consent_timestamp(self):
        request = self.multipart_request(
            self.valid_fields(),
            ("resume.pdf", b"%PDF-1.7\nresume content"),
        )
        with urlopen(request) as response:
            self.assertEqual(response.status, 201)
            self.assertEqual(json.loads(response.read()), {"saved": True})

        with closing(sqlite3.connect(server.DATABASE_PATH)) as connection:
            row = connection.execute(
                "SELECT name, vacancy_id, resume_path, consent_at FROM applications"
            ).fetchone()
        self.assertEqual(row[0], "Марія Коваленко")
        self.assertEqual(row[1], "current-offer")
        self.assertTrue(row[2].startswith("uploads/"))
        self.assertTrue(row[3])
        saved_resume = server.DATA_DIR / row[2]
        self.assertEqual(saved_resume.read_bytes(), b"%PDF-1.7\nresume content")
        self.assertEqual(saved_resume.stat().st_mode & 0o777, 0o600)
        self.assertEqual((server.DATABASE_PATH.parent / "uploads").stat().st_mode & 0o777, 0o700)

    def test_inactive_vacancy_cannot_receive_application(self):
        request = self.multipart_request(self.valid_fields(vacancy_id="old-offer"))
        with self.assertRaises(HTTPError) as error:
            urlopen(request)
        self.assertEqual(error.exception.code, 400)
        self.assertEqual(json.loads(error.exception.read())["error"], "vacancy_unavailable")
        error.exception.close()
        with closing(sqlite3.connect(server.DATABASE_PATH)) as connection:
            self.assertEqual(connection.execute("SELECT COUNT(*) FROM applications").fetchone()[0], 0)

    def test_invalid_resume_is_rejected_without_saving_application(self):
        request = self.multipart_request(self.valid_fields(), ("resume.pdf", b"not a PDF"))
        with self.assertRaises(HTTPError) as error:
            urlopen(request)
        self.assertEqual(error.exception.code, 400)
        self.assertEqual(json.loads(error.exception.read())["error"], "invalid_file")
        error.exception.close()
        with closing(sqlite3.connect(server.DATABASE_PATH)) as connection:
            self.assertEqual(connection.execute("SELECT COUNT(*) FROM applications").fetchone()[0], 0)

    def test_public_job_api_hides_inactive_offers(self):
        with urlopen(f"{self.base_url}/api/jobs") as response:
            jobs = json.loads(response.read())
        self.assertEqual([job["id"] for job in jobs], ["current-offer"])

    def test_private_storage_is_not_served_as_a_public_file(self):
        with self.assertRaises(HTTPError) as error:
            urlopen(f"{self.base_url}/private/uploads/resume.pdf")
        self.assertEqual(error.exception.code, 404)
        error.exception.close()


if __name__ == "__main__":
    unittest.main()
