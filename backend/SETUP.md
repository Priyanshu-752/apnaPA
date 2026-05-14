# Backend Setup Guide

This guide explains:

- which values in `backend/.env` you need to fill
- where each value comes from
- how to start the backend locally on Windows PowerShell
- how to verify the server booted correctly

All commands below assume you are in the repository root:

```powershell
cd C:\Users\Priyanshu\Desktop\PersonalAgent
```

## 1. Create `backend/.env`

The backend reads environment values from `backend/.env` automatically.

Create it from the template:

```powershell
Copy-Item backend/.env.example backend/.env
```

## 2. Fill the environment variables

### Safe defaults you can keep for local development

You usually do not need to change these just to boot the current scaffold:

```env
APP_APP_NAME=apnaPA Backend
APP_ENVIRONMENT=development
APP_API_PREFIX=/api
APP_ACCESS_TOKEN_EXPIRY_MINUTES=30
APP_REFRESH_TOKEN_EXPIRY_DAYS=14
APP_DUMMY_GOOGLE_AUDIENCE=apnapa-dashboard
APP_OPENAI_MODEL=gpt-4.1-mini
APP_QDRANT_URL=http://localhost:6333
APP_REDIS_URL=redis://localhost:6379/0
APP_N8N_BASE_URL=http://localhost:5678
APP_DEFAULT_TIMEZONE=Asia/Kolkata
APP_DEFAULT_AI_STYLE=Concise, supportive, and confirmation-first.
```

### Values you should generate yourself

#### `APP_SECRET_KEY`

Used to sign backend tokens.

Generate a strong value in PowerShell:

```powershell
python -c "import secrets; print(secrets.token_urlsafe(48))"
```

Paste the output into `APP_SECRET_KEY`.

#### `APP_N8N_WEBHOOK_SECRET`

Used to protect inbound workflow webhooks.

Generate another random string:

```powershell
python -c "import secrets; print(secrets.token_urlsafe(32))"
```

Use the same value in both places later:

- `backend/.env` as `APP_N8N_WEBHOOK_SECRET`
- your n8n workflow header `x-apnapa-secret`

### Values that come from local services or provider dashboards

#### `APP_DATABASE_URL`

This is your Postgres connection string.

Local example:

```env
APP_DATABASE_URL=postgresql+asyncpg://postgres:postgres@localhost:5432/apnapa
```

If you want a quick local Postgres container:

```powershell
docker run --name apnapa-postgres -e POSTGRES_DB=apnapa -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres:16
```

How to build the URL:

- username: `postgres`
- password: `postgres`
- host: `localhost`
- port: `5432`
- database: `apnapa`
- final URL: `postgresql+asyncpg://postgres:postgres@localhost:5432/apnapa`

Important: the current backend scaffold does not open a real database connection on startup yet, so Postgres is not required just to boot the API. You only need a real value here to stay ready for the next persistence slice.

#### `APP_FIREBASE_PROJECT_ID`
#### `APP_FIREBASE_CLIENT_EMAIL`
#### `APP_FIREBASE_PRIVATE_KEY`

These come from a Firebase service account JSON key.

Steps:

1. Open Firebase Console.
2. Select your project.
3. Go to Project settings.
4. Open the Service accounts tab.
5. Click Generate new private key.
6. Download the JSON file.

Map fields from that JSON into `.env` like this:

- `project_id` -> `APP_FIREBASE_PROJECT_ID`
- `client_email` -> `APP_FIREBASE_CLIENT_EMAIL`
- `private_key` -> `APP_FIREBASE_PRIVATE_KEY`

For `APP_FIREBASE_PRIVATE_KEY`, keep the newline escapes exactly like this pattern:

```env
APP_FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_KEY_HERE\n-----END PRIVATE KEY-----\n"
```

If you paste the private key from JSON, replace real line breaks with `\n` and keep the surrounding double quotes.

Important: the current scaffold stores these settings but does not yet perform Firebase Admin verification on startup.

#### `APP_TELEGRAM_BOT_TOKEN`
#### `APP_TELEGRAM_BOT_USERNAME`

These come from Telegram BotFather.

Steps:

1. Open Telegram.
2. Start a chat with `@BotFather`.
3. Run `/newbot`.
4. Follow the prompts to choose the bot name and username.
5. Copy the API token BotFather returns.

Use them like this:

- BotFather token -> `APP_TELEGRAM_BOT_TOKEN`
- chosen bot username, for example `my_agent_bot` -> `APP_TELEGRAM_BOT_USERNAME`

#### `APP_OPENAI_API_KEY`
#### `APP_OPENAI_MODEL`

These come from your OpenAI account.

Steps:

1. Open the OpenAI dashboard.
2. Go to API keys.
3. Create a new secret key.
4. Paste it into `APP_OPENAI_API_KEY`.
5. Set `APP_OPENAI_MODEL` to a model your account can access.

You can keep `gpt-4.1-mini` if that model is available in your account.

Important: the current scaffold stores this config but does not make live OpenAI calls on startup.

#### `APP_QDRANT_URL`
#### `APP_QDRANT_API_KEY`

These come from either a local Qdrant instance or Qdrant Cloud.

For local development with Docker:

```powershell
docker run --name apnapa-qdrant -p 6333:6333 -p 6334:6334 -d qdrant/qdrant
```

Then use:

```env
APP_QDRANT_URL=http://localhost:6333
```

For `APP_QDRANT_API_KEY`:

- local unauthenticated Qdrant: keep a placeholder value for now
- Qdrant Cloud or auth-enabled Qdrant: copy the API key from the cluster dashboard

Important: the current scaffold does not query Qdrant on startup.

#### `APP_REDIS_URL`

This is your Redis connection string.

Quick local Redis with Docker:

```powershell
docker run --name apnapa-redis -p 6379:6379 -d redis:7
```

Then use:

```env
APP_REDIS_URL=redis://localhost:6379/0
```

Important: the current scaffold stores this setting but does not connect to Redis on startup.

#### `APP_N8N_BASE_URL`

This is the URL where your n8n instance is available.

Local default:

```env
APP_N8N_BASE_URL=http://localhost:5678
```

If you need a local n8n container:

```powershell
docker run --name apnapa-n8n -p 5678:5678 -d n8nio/n8n
```

#### `APP_DUMMY_GOOGLE_AUDIENCE`

For the current scaffold, you can keep `apnapa-dashboard`.

Later, when you wire a real Google sign-in flow, replace this with the frontend client audience or OAuth client identifier your auth flow expects.

## 3. Install backend dependencies

Create a virtual environment in the repository root:

```powershell
python -m venv .venv
```

Activate it:

```powershell
.\.venv\Scripts\Activate.ps1
```

Install the backend requirements:

```powershell
python -m pip install -r backend/requirements.txt
```

If PowerShell blocks script activation, run this once in the same terminal:

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
```

Then activate the virtual environment again.

## 4. Start the backend server

From the repository root, run:

```powershell
python -m uvicorn backend.main:app --reload
```

Use the repository root for this command. `backend.main:app` expects the top-level `backend` package to be importable.

## 5. Verify it started correctly

Open these URLs in the browser:

- Swagger UI: `http://127.0.0.1:8000/docs`
- ReDoc: `http://127.0.0.1:8000/redoc`
- Health route: `http://127.0.0.1:8000/api/admin/health`

Expected health response shape:

```json
{
  "status": "ok",
  "environment": "development",
  "database": "placeholder"
}
```

The `database` value is currently `placeholder` because the project still uses a database session stub.

## 6. Minimum `.env` for first local boot

If your goal is only to boot the current scaffold locally, this smaller setup is enough:

- set a real `APP_SECRET_KEY`
- set a real `APP_N8N_WEBHOOK_SECRET`
- keep the default local URLs for Postgres, Redis, Qdrant, and n8n
- keep placeholder provider keys until those integrations are implemented or tested

That works because the current app loads settings on startup but does not yet establish live Firebase, OpenAI, Qdrant, Redis, Telegram, or Postgres connections during boot.