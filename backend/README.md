# apnaPA Backend

This is the first real backend slice for apnaPA.

It currently includes:

- a FastAPI app factory and route registration
- auth token exchange, refresh, logout, and `/me`
- protected route dependencies
- a shared orchestrator scaffold with health and finance agent stubs
- placeholder dashboard, onboarding, Telegram, reminder, goal, memory, settings, notification, and workflow routes
- in-memory session mutation for profile, onboarding-complete, and Telegram-linked state
- n8n-style workflow webhook contracts with shared-secret validation
- pytest coverage for app boot, auth flow shape, token helpers, agent routing, and workflow secret checks

---

## Run

Environment files:

- local editable file: `backend/.env`
- tracked template: `backend/.env.example`

The backend settings loader reads `backend/.env` automatically.

Detailed setup guide:

- `backend/SETUP.md` for where each env value comes from and the full local boot flow

```bash
python -m uvicorn backend.main:app --reload
```

Open docs locally:

- Swagger UI: `http://127.0.0.1:8000/docs`
- ReDoc: `http://127.0.0.1:8000/redoc`
- Health route: `http://127.0.0.1:8000/api/admin/health`

---

## Test

```bash
python -m pytest backend/tests
```

---

## Keys And Secrets

Replace placeholder values in `backend/.env` with your real keys.

If you need the exact steps for Firebase, Telegram, OpenAI, Postgres, Qdrant, Redis, n8n, and the frontend Google client id, use `backend/SETUP.md`.

Most important ones:

- `APP_SECRET_KEY`
- `APP_DATABASE_URL`
- `APP_FIREBASE_PROJECT_ID`
- `APP_FIREBASE_CLIENT_EMAIL`
- `APP_FIREBASE_PRIVATE_KEY`
- `APP_TELEGRAM_BOT_TOKEN`
- `APP_OPENAI_API_KEY`
- `APP_QDRANT_URL`
- `APP_QDRANT_API_KEY`
- `APP_N8N_WEBHOOK_SECRET`

`backend/.env` is ignored by git. `backend/.env.example` is the safe template to keep in the repo.

---

## Current Scope

This backend is intentionally scaffold-first.

What is real now:

- route groups and protected auth boundaries
- in-memory session lifecycle
- JWT access token creation and validation
- refresh token rotation and logout
- in-memory mutation of current-session profile, onboarding, and Telegram-link flags
- orchestrator-first agent contract
- n8n webhook secret pattern

What is still placeholder:

- database persistence
- Firebase Admin verification
- OpenAI model calls
- Telegram bot handlers
- Qdrant memory retrieval
- reminder delivery workers and analytics events
- most domain responses beyond contract shape and acknowledgement messages
