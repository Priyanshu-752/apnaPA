# n8n Workflow Role

n8n is the automation layer. It should schedule and deliver work, but it should not own AI reasoning or domain decisions.

---

## What n8n Owns

- cron schedules.
- retries for delivery workflows.
- reminder delivery.
- weekly report triggers.
- email or Telegram delivery handoff.
- inactivity checks that call FastAPI.

---

## What FastAPI Owns Instead

- deciding what a reminder means.
- deciding whether a user is allowed to receive data.
- generating summaries.
- choosing agent actions.
- reading and writing domain state.
- creating events.

In the current scaffold, this contract starts in `backend/app/api/routes/workflows.py`.

---

## Webhook Pattern

```text
n8n scheduled trigger
  -> FastAPI signed webhook endpoint
  -> FastAPI validates secret
  -> FastAPI loads user and domain state
  -> FastAPI decides action
  -> FastAPI returns delivery payload
  -> n8n sends Telegram or email
  -> n8n reports success/failure
```

Current scaffold route examples:

- `POST /api/workflows/reminders/trigger`
- `POST /api/workflows/delivery-report`

---

## Test vs Production URLs

n8n exposes different webhook URLs for testing and production. During workflow development, test webhooks are useful because n8n can show incoming data in the editor. Production webhooks require saved and published workflows.

Official reference: n8n's webhook workflow development docs explain test URLs, production URLs, and publishing behavior.

---

## Webhook Authentication

apnaPA should use authenticated webhooks for n8n callbacks.

Options supported by n8n webhook credentials include:

- basic auth.
- header auth.
- JWT auth.
- none.

For apnaPA, header auth or JWT auth is the preferred direction.

Official reference: n8n webhook credentials docs list the supported webhook authentication methods.

---

## First n8n Code We Will Build Later

Implemented now:

- FastAPI workflow route group.
- shared webhook secret setting.
- reminder trigger contract.
- delivery result contract.
- tests for accepted and rejected webhook calls.

Still later:

- per-workflow signatures.
- retry-safe idempotency keys.
- real reminder fanout to Telegram or email.
- workflow audit events.
