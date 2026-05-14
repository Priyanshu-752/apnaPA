# apnaPA Backend Context

**Last Updated**: 2026-05-14  
**Status**: FastAPI scaffold implemented and tested  
**Entry Point**: `backend.main:app`

---

## Current State

- FastAPI app factory exists in `backend/app/main.py` and is re-exported through `backend/main.py`.
- Settings load from `backend/.env` or `.env` through `backend/app/config/settings.py`.
- Auth routes exist for Google token exchange, refresh, logout, and `/me`.
- Session handling is currently in-memory and refresh-token rotation is already tested.
- Protected-route dependencies exist for retrieving the current user from bearer tokens.
- Route groups are registered for admin, auth, onboarding, telegram, agent, conversation, dashboard, health, finance, reminders, goals, memory, settings, notifications, and workflows.
- Admin health check is available at `/api/admin/health`.
- The orchestrator, health agent, finance agent, and memory retriever stub are wired into the agent system.
- Workflow routes validate `x-apnapa-secret` against `APP_N8N_WEBHOOK_SECRET`.

---

## Implemented Backend Slices

### Auth and Session Foundation

- Dummy Firebase verifier adapter currently accepts the provider-token handoff shape.
- JWT access tokens are issued and decoded with expiry handling.
- Refresh tokens are hashed, rotated, and validated.
- `/api/auth/google` returns a session payload with user and token data.
- `/api/auth/me` is protected and resolves the current user.

### Agent Scaffold

- Base agent contract exists.
- Agent registry resolves domain agents by supported intent.
- Orchestrator service classifies a small set of intents from message keywords.
- Health and finance agents return typed write-proposal style responses.
- Memory retrieval is stubbed with hardcoded data.

### Route Surface

- Admin health route returns boot state and placeholder database backend.
- Onboarding, Telegram, conversation, dashboard, health, finance, reminders, goals, memory, settings, and notifications all expose placeholder contract routes.
- Workflow routes already enforce shared-secret validation.

### Tests

- `backend/tests/test_app.py`
- `backend/tests/test_auth.py`
- `backend/tests/test_tokens.py`
- `backend/tests/test_agents.py`
- `backend/tests/test_workflows.py`

Current backend test count from source: 12 pytest tests.

---

## Intentionally Placeholder Areas

- No real PostgreSQL connection or ORM session yet.
- No real Firebase Admin verification yet.
- No OpenAI calls yet.
- No Qdrant retrieval yet.
- No Redis or worker runtime yet.
- No real Telegram bot handler yet.
- No persistence-backed onboarding, reminders, goals, memory, or dashboard state yet.

These are expected gaps, not regressions.

---

## Next Backend Steps

1. Replace the dummy Firebase verifier with Firebase Admin SDK integration.
2. Add async database models, migrations, and session management.
3. Persist users, auth providers, sessions, onboarding state, and Telegram link records.
4. Add real domain services behind the existing route contracts.
5. Replace agent stubs with real tool execution and confirmation-save flows.
6. Add Qdrant and OpenAI integrations after persistence boundaries are stable.

---

## Local Commands

Run backend:

```bash
python -m uvicorn backend.main:app --reload
```

Run backend tests:

```bash
python -m pytest backend/tests
```

Environment and service setup guide:

- `backend/SETUP.md`

---

Use this file for backend-specific refreshes instead of overloading the whole-app `context.md`.