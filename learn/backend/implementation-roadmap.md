# Backend Implementation Roadmap

The backend will be built slowly and test-first. FastAPI will own the product state, auth, domain logic, AI orchestration, events, and integration contracts.

---

## Phase 1: Backend Skeleton

Status: implemented in this repo.

What we build:

- `backend/main.py`
- `backend/app/main.py`
- `backend/app/config/settings.py`
- `backend/app/api/routes/*`
- `/api/admin/health`
- `backend/tests/*`

What you learn:

- How a FastAPI app is created.
- How routes are grouped.
- How health checks prove the app can boot.
- How tests hit routes without starting a real server.

What to inspect now:

- `backend/app/main.py`
- `backend/app/api/routes/__init__.py`
- `backend/app/api/routes/admin.py`
- `backend/tests/test_app.py`

---

## Phase 2: Auth Foundation

Status: scaffold implemented with in-memory sessions and dummy Google verification.

What we build:

- Firebase token verification adapter.
- Canonical `users` model.
- `auth_providers` model.
- `sessions` model.
- JWT access tokens.
- refresh token hashing and rotation.
- protected route dependency.

What you learn:

- Difference between identity provider auth and app sessions.
- Why Firebase is not the source of truth for apnaPA users.
- Why refresh tokens are stored hashed.
- How dependency injection loads the current user.

What to inspect now:

- `backend/app/auth/firebase.py`
- `backend/app/auth/tokens.py`
- `backend/app/auth/sessions.py`
- `backend/app/api/dependencies.py`
- `backend/app/api/routes/auth.py`
- `backend/tests/test_auth.py`
- `backend/tests/test_tokens.py`

---

## Phase 3: Onboarding

What we build:

- onboarding status endpoint.
- step persistence.
- completion endpoint.
- initial health goal, finance goal, reminder, and memory setup.

What you learn:

- How multi-step forms persist safely.
- How onboarding initializes product state.
- Why backend owns defaults and recommendations.

---

## Phase 4: Telegram Linking

What we build:

- link token creation.
- hashed expiring tokens.
- `/start <token>` confirmation path.
- linked `telegram_id`.
- unlink and reconnect.

What you learn:

- Why Telegram is a linked channel, not a login provider.
- How temporary tokens work.
- How to prevent one Telegram account from accessing another user's data.

---

## Phase 5: Domain Services

What we build:

- health logs.
- finance logs.
- goals.
- reminders.
- daily states.
- dashboard summaries.

What you learn:

- How service classes keep routes thin.
- How domain writes emit events.
- How dashboard reads are shaped for frontend use.

---

## Phase 6: Agent Integration

Status: orchestrator shell and routing tests implemented.

What we build:

- orchestrator endpoint.
- agent registry.
- typed tools.
- confirmation flow.
- AI usage and action logs.

What you learn:

- How agents call backend tools safely.
- Why AI-generated writes need validation and confirmation.
- How to keep channel behavior consistent across Telegram and dashboard.

What to inspect now:

- `backend/app/agents/base.py`
- `backend/app/agents/registry.py`
- `backend/app/agents/orchestrator/service.py`
- `backend/app/agents/health/agent.py`
- `backend/app/agents/finance/agent.py`
- `backend/app/api/routes/agent.py`
- `backend/tests/test_agents.py`
