# Backend Core Architecture

**Status**: Planned  
**Source**: `../../plan.md`

---

## Purpose

The backend is the source of truth for apnaPA. It owns users, sessions, onboarding, Telegram linking, domain data, AI orchestration, memory, events, reminders, analytics, and integrations.

Firebase validates Google identity only. Telegram and the dashboard are channels into the same backend.

---

## Planned Stack

| Layer | Technology |
| --- | --- |
| API | FastAPI |
| Language | Python |
| Validation | Pydantic |
| Database ORM | Async SQLAlchemy or SQLModel |
| Structured Store | PostgreSQL |
| Vector Store | Qdrant |
| Queue and Cache | Redis later |
| Workers | Celery or Dramatiq later |
| AI | OpenAI APIs |
| Automation | n8n webhook contracts |

---

## Directory Shape

```text
backend/
  app/
    api/
      routes/
      dependencies.py
    auth/
      firebase.py
      tokens.py
      sessions.py
      middleware.py
    agents/
      base.py
      registry.py
      orchestrator/
      health/
      finance/
      memory/
    tools/
      health_tools.py
      finance_tools.py
      reminder_tools.py
    workflows/
      n8n_client.py
    services/
      telegram_service.py
      transcription_service.py
      onboarding_service.py
      reminder_service.py
      analytics_service.py
      daily_state_service.py
      notification_service.py
    database/
      session.py
      migrations/
    models/
    schemas/
    vector_memory/
      qdrant_client.py
      retriever.py
      summarizer.py
    events/
      bus.py
      handlers.py
      types.py
    queues/
      workers.py
      jobs.py
      retry.py
    prompts/
      versions/
    utils/
    observability/
      logging.py
      metrics.py
      tracing.py
    config/
      settings.py
  main.py
  requirements.txt
```

---

## Backend Boundaries

| Area | Owns | Does Not Own |
| --- | --- | --- |
| Auth | Canonical users, sessions, JWTs, refresh token rotation, auth middleware | Google OAuth UI |
| Onboarding | Step persistence, completion, initial goals, reminders, memory | Frontend form layout |
| Telegram | Link tokens, linked account state, webhook validation, bot access rules | Telegram as an identity provider |
| Domain Services | Health logs, finance logs, goals, reminders, daily states, summaries | Unconfirmed AI writes |
| Agent Runtime | Intent routing, tool execution, memory retrieval, prompt versions, confirmations | Direct frontend state |
| Events | Immutable event creation and consumers | External workflow business logic |
| n8n Contracts | Webhook endpoints and delivery requests | AI reasoning or domain decisions |

---

## API Groups

| Group | Routes |
| --- | --- |
| Auth | `/api/auth/google`, `/api/auth/refresh`, `/api/auth/logout`, `/api/auth/me` |
| Onboarding | `/api/onboarding/status`, `/api/onboarding/step`, `/api/onboarding/complete`, `/api/onboarding/recommendations` |
| Telegram | `/api/telegram/link-token`, `/api/telegram/link/confirm`, `/api/telegram/unlink`, `/api/telegram/link/status`, `/api/telegram/webhook` |
| Conversation | `/api/agent/chat`, `/api/conversation/message`, `/api/conversation/voice`, `/api/conversation/history` |
| Dashboard | `/api/dashboard/overview`, `/api/dashboard/activity`, `/api/dashboard/insights` |
| Health | Daily state, summaries, daily details, logs, goals |
| Finance | Summaries, daily details, logs, budgets, goals |
| Goals | List, create, update, suggestions |
| Reminders | List, create, update, complete, snooze |
| Memory | Search, recent, create, update |
| Settings | Profile, notifications, AI preferences |
| Notifications | List, mark read, test |
| Admin | Health, metrics, jobs, AI usage, workflows |

---

## Request Flow

1. API route validates request and auth context.
2. Dependency layer loads user, permissions, request id, and trace id.
3. Service layer performs domain work inside a transaction when needed.
4. Domain writes emit immutable events.
5. Agent writes are proposed first, validated, and saved only after user confirmation.
6. Observability records route, user id, trace id, latency, AI usage, and errors.

---

## First Implementation Slice

Build the backend skeleton before domain features:

- Settings loader.
- FastAPI app factory or `main.py`.
- Health check route.
- Database session placeholder.
- Auth schemas.
- Firebase verification adapter interface.
- JWT helper.
- Session service interface.
- Auth routes with dependency boundaries.
- Unit tests for token/session helpers and route shape.

The first slice should not implement full Telegram, memory, or agent behavior yet.
