# FastAPI Core Concepts For apnaPA

FastAPI is now the backend scaffold used in apnaPA.

---

## App

The app is the main object that receives requests and returns responses.

In apnaPA, the app:

- register route groups.
- configure middleware.
- expose health checks.
- attach observability.
- serve OpenAPI docs in development.

Current file:

- `backend/app/main.py`

---

## APIRouter

Routes are split by domain:

- `auth`
- `onboarding`
- `telegram`
- `agent`
- `dashboard`
- `health`
- `finance`
- `reminders`
- `memory`
- `settings`
- `admin`
- `workflows`

Why this matters:

- Files stay small.
- Route ownership is clear.
- Tests can focus on one domain at a time.
- API docs remain grouped by tags.

Official reference: FastAPI's bigger applications guide explains this multi-file routing pattern with `APIRouter`.

Current files:

- `backend/app/api/routes/__init__.py`
- `backend/app/api/routes/auth.py`
- `backend/app/api/routes/agent.py`
- `backend/app/api/routes/workflows.py`

---

## Dependencies

Dependencies are functions FastAPI runs before a route.

apnaPA uses dependencies for:

- loading settings.
- opening database sessions.
- reading auth headers.
- validating access tokens.
- loading the current user.
- enforcing Telegram linked-user checks.
- validating n8n workflow secrets.

Official reference: FastAPI's dependency injection guide explains the `Depends` pattern.

Current file:

- `backend/app/api/dependencies.py`

---

## Pydantic Schemas

Schemas validate inputs and outputs.

apnaPA uses schemas for:

- auth requests.
- onboarding steps.
- Telegram webhook payloads.
- health and finance logs.
- agent responses.
- confirmation proposals.
- dashboard summaries.
- workflow trigger payloads.

Why this matters:

- Invalid inputs are rejected early.
- AI outputs can be validated before writes.
- Frontend and backend share predictable shapes.

---

## Settings

Settings should load environment values into typed config.

apnaPA will use settings for:

- database URL.
- JWT secret.
- Firebase credentials.
- Telegram token.
- OpenAI API key.
- Qdrant URL.
- n8n webhook secrets.

Official reference: Pydantic Settings documents loading typed configuration from environment variables and dotenv/secrets sources.

Current file:

- `backend/app/config/settings.py`

---

## Testing

FastAPI routes can be tested without launching an external server by using `TestClient`.

apnaPA currently tests:

- health route.
- auth flow shape.
- protected route dependency.
- agent routing behavior.
- workflow secret validation.

Official reference: FastAPI's testing guide explains `TestClient` and pytest-based tests.

Current tests:

- `backend/tests/test_app.py`
- `backend/tests/test_auth.py`
- `backend/tests/test_tokens.py`
- `backend/tests/test_agents.py`
- `backend/tests/test_workflows.py`
