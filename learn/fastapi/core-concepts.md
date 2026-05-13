# FastAPI Core Concepts For apnaPA

FastAPI is the backend framework planned for apnaPA.

---

## App

The app is the main object that receives requests and returns responses.

In apnaPA, the app will:

- register route groups.
- configure middleware.
- expose health checks.
- attach observability.
- serve OpenAPI docs in development.

---

## APIRouter

Routes should be split by domain:

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

Why this matters:

- Files stay small.
- Route ownership is clear.
- Tests can focus on one domain at a time.
- API docs remain grouped by tags.

Official reference: FastAPI's bigger applications guide explains this multi-file routing pattern with `APIRouter`.

---

## Dependencies

Dependencies are functions FastAPI runs before a route.

apnaPA will use dependencies for:

- loading settings.
- opening database sessions.
- reading auth headers.
- validating access tokens.
- loading the current user.
- enforcing Telegram linked-user checks.

Official reference: FastAPI's dependency injection guide explains the `Depends` pattern.

---

## Pydantic Schemas

Schemas validate inputs and outputs.

apnaPA will use schemas for:

- auth requests.
- onboarding steps.
- Telegram webhook payloads.
- health and finance logs.
- agent responses.
- confirmation proposals.
- dashboard summaries.

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

---

## Testing

FastAPI routes can be tested without launching an external server by using `TestClient`.

apnaPA will test:

- health route.
- auth flow shape.
- protected route dependency.
- onboarding persistence.
- Telegram linking rules.
- agent route behavior with dummy tools.

Official reference: FastAPI's testing guide explains `TestClient` and pytest-based tests.
