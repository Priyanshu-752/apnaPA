# Connecting n8n To The Backend

This is the practical guide for wiring n8n into the current apnaPA backend scaffold.

---

## Current Contract

The repo now exposes workflow-style endpoints in:

- `backend/app/api/routes/workflows.py`

Current routes:

- `POST /api/workflows/reminders/trigger`
- `POST /api/workflows/delivery-report`

Both expect the header:

- `x-apnapa-secret: local-n8n-secret`

In production, this value should come from `APP_N8N_WEBHOOK_SECRET`.

---

## Simple Flow

Use this pattern first:

1. n8n `Schedule Trigger` starts the workflow.
2. n8n `Set` node prepares JSON like `user_id`, `workflow_run_id`, and `channel`.
3. n8n `HTTP Request` sends that JSON to FastAPI.
4. FastAPI validates the shared secret.
5. FastAPI decides what should happen next.
6. n8n handles delivery or follow-up automation.

---

## Example HTTP Request Node

Method:

- `POST`

URL:

- `http://127.0.0.1:8000/api/workflows/reminders/trigger`

Headers:

- `x-apnapa-secret: local-n8n-secret`
- `Content-Type: application/json`

Body:

```json
{
  "user_id": "google:demo123",
  "workflow_run_id": "n8n-run-001",
  "channel": "telegram"
}
```

---

## Why This Split Matters

FastAPI should decide:

- whether the user is valid.
- whether the reminder should be sent.
- what the final reminder text or payload is.
- whether the workflow result should be stored.

n8n should handle:

- schedule timing.
- retries.
- delivery branching.
- calling external systems.

That keeps business rules in one place and automation plumbing in another.

---

## Good First Workflows To Build

Start with these:

1. A morning reminder trigger that posts to `/api/workflows/reminders/trigger`.
2. A delivery report workflow that posts back to `/api/workflows/delivery-report`.
3. A weekly summary trigger that later calls a backend summary endpoint before sending Telegram or email.

---

## What To Add Next In Code

After this scaffold, the next backend improvements should be:

1. idempotency keys to avoid duplicate reminder sends.
2. signed payloads or JWT webhook auth.
3. persistent workflow logs in PostgreSQL.
4. domain services that convert reminder records into delivery payloads.
5. separate endpoints for reminders, summaries, inactivity checks, and Telegram handoff.
