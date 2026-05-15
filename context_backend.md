# apnaPA Backend Context

**Last Updated**: 2026-05-14  
**Status**: FastAPI scaffold plus first session-mutation slice implemented and tested  
**Entry Point**: `backend.main:app`

---

## Current State

- FastAPI app factory exists in `backend/app/main.py` and is re-exported through `backend/main.py`.
- Settings load from `backend/.env` or `.env` through `backend/app/config/settings.py`.
- Auth routes exist for Google token exchange, refresh, logout, and `/me`.
- Session handling is still in-memory, but the session service now mutates user profile, onboarding-complete state, and Telegram-linked state within the current session.
- Protected-route dependencies exist for retrieving the current user from bearer tokens.
- Route groups are registered for admin, auth, onboarding, telegram, agent, conversation, dashboard, health, finance, reminders, goals, memory, settings, notifications, and workflows.
- Admin health check is available at `/api/admin/health`.
- The orchestrator, health agent, finance agent, and memory retriever stub are wired into the agent system.
- Workflow routes validate `x-apnapa-secret` against `APP_N8N_WEBHOOK_SECRET`.

---

## Implemented Backend Slices

### Auth and Session Foundation

- Dummy Google verifier adapter still accepts the provider-token handoff shape.
- JWT access tokens are issued and decoded with expiry handling.
- Refresh tokens are hashed, rotated, and validated.
- `/api/auth/google` returns a session payload with `message`, user, and token data.
- `/api/auth/refresh` rotates refresh tokens and returns a new session payload.
- `/api/auth/logout` revokes the in-memory session by refresh token.
- `/api/auth/me` is protected and resolves the current user.

### Session-Backed Placeholder Mutations

- `InMemorySessionService` now supports:
  - `update_user_profile(...)`
  - `mark_onboarding_complete(...)`
  - `set_telegram_linked(...)`
- `/api/settings/profile` now returns a success message plus updated user shape.
- `/api/onboarding/complete` now mutates onboarding state in the current session.
- `/api/telegram/link/confirm` and `/api/telegram/unlink` now mutate Telegram link state in the current session.

### Agent Scaffold

- Base agent contract exists.
- Agent registry resolves domain agents by supported intent.
- Orchestrator service classifies a small set of intents from message keywords.
- Health and finance agents return typed write-proposal style responses.
- Memory retrieval is still stubbed with hardcoded data.

### Route Surface

- Dashboard routes expose placeholder overview, activity, and insight contracts.
- Health, finance, goals, reminders, onboarding, Telegram, memory, settings, notifications, and workflows all expose contract routes.
- Some routes are now useful for frontend integration even though they still return placeholder business data or acknowledgement messages.

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
- No persistence-backed user or session store yet.
- No OpenAI calls yet.
- No Qdrant retrieval yet.
- No Redis or worker runtime yet.
- No real Telegram bot handler yet.
- No persistence-backed onboarding, reminders, goals, memory, or dashboard state yet.
- Dashboard overview or action routes often return placeholder content even when the frontend now consumes them.

These are expected gaps, not regressions.

---

## Next Backend Steps

1. Replace the dummy Firebase verifier with real Firebase Admin SDK verification against the frontend Google client.
2. Add async database models, migrations, and session management.
3. Persist users, auth providers, refresh tokens or sessions, onboarding state, Telegram links, and profile settings.
4. Add real domain services behind the existing onboarding, dashboard, health, finance, reminders, goals, memory, and settings routes.
5. Expand agent behavior from routing stubs to real tool execution and confirmation-save flows.
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
