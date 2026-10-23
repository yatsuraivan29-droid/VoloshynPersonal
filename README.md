# Voloshyn Personal

Bilingual Ukrainian/Slovak recruitment website with a home page, a vacancy
catalogue, an accessible application dialog, and a small same-origin Python API.

## Run locally

Requires Python 3.10 or newer; no third-party packages are needed.

```sh
python3 server.py
```

Open <http://localhost:8000>. Applications are stored in a private SQLite
database under `~/.local/share/voloshyn-personal/`; optional CV files are stored
in its `uploads/` directory. This storage is outside the project and is never
served by the web server. Set `PORT` to change the port, `HOST` to change the
bind address (for example, `0.0.0.0` behind a secured deployment proxy),
`DATA_DIR` to select a persistent private-data location, and `JOBS_FILE` or
`SITE_CONFIG_FILE` to use alternate JSON files.

## Publish confirmed vacancies

The catalogue intentionally starts empty. Add only confirmed, current offers
to `jobs.json` (or to the file selected by `JOBS_FILE`); remove or deactivate
offers as soon as they are no longer current. The file contains an array of
objects with this shape:

```json
[
  {
    "id": "confirmed-offer-id",
    "active": true,
    "title": { "ua": "Назва посади", "sk": "Názov pozície" },
    "city": { "ua": "Місто", "sk": "Mesto" },
    "category": "production",
    "salary": { "ua": "За домовленістю", "sk": "Dohodou" },
    "salaryType": { "ua": "за місяць", "sk": "mesačne" },
    "schedule": { "ua": "Повна зайнятість", "sk": "Plný úväzok" },
    "shortDescription": {
      "ua": "Короткий підтверджений опис.",
      "sk": "Krátky potvrdený opis."
    },
    "housing": { "ua": "Умови житла", "sk": "Podmienky ubytovania" },
    "responsibilities": { "ua": ["Обов'язок"], "sk": ["Pracovná náplň"] },
    "requirements": { "ua": ["Вимога"], "sk": ["Požiadavka"] },
    "conditions": { "ua": ["Умова"], "sk": ["Podmienka"] }
  }
]
```

Supported categories are `production`, `logistics`, `automotive`,
`hospitality`, and `other`. Salary, housing, schedule, and description fields
are optional; enter only details that have been confirmed. Set `"active": false`
or remove an offer to hide it immediately.

## Editable contacts

Edit `site-config.json` to change the footer email, telephone, Instagram, and
Telegram links. Replace the setup placeholders before publishing. The privacy
dialog is a basic notice, not legal advice; have it reviewed and completed with
the agency's actual data-controller details before collecting real applications.

## Application storage and email

The API validates required fields, consent, vacancy status, and optional PDF or
DOCX content. Uploads have a 10 MiB request limit and are stored outside the
public web root with restrictive filesystem permissions. The database keeps
the submitted consent timestamp and a private storage reference; it exposes no
application or resume retrieval endpoint. Protect and back up `DATA_DIR` as
personal data, restrict server access, and define a retention/deletion process
before production use.

Optional email notifications can be enabled with `SMTP_HOST`, `SMTP_PORT`,
`SMTP_USER`, `SMTP_PASSWORD`, `SMTP_FROM`, and `APPLICATIONS_EMAIL`. Use
`SMTP_USE_TLS=1` for STARTTLS. Keep credentials in the hosting provider's
secret manager. A notification is sent only after the database has saved an
application; email delivery failures are logged server-side and do not
misrepresent the saved application as lost.

Deploy behind HTTPS on a production-grade WSGI/reverse-proxy setup, configure
backups and monitoring, and replace the sample photography with licensed
agency-owned imagery as needed. External Unsplash images are used as visual
examples; no vacancies, employers, compensation, or placement guarantees are
pre-populated.

Run the backend checks with:

```sh
python3 -m unittest -v
```
