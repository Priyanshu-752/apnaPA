# Backend Core Architecture

**Status**: FastAPI scaffold, auth foundation, and first session-mutation slice implemented  
**Source**: `../../plan.md`

---

## Purpose

The backend is the source of truth for apnaPA. It owns users, sessions, onboarding, Telegram linking, domain data, AI orchestration, memory, events, reminders, analytics, and integrations.

The current frontend now reaches these contracts through Next.js route handlers, but FastAPI still owns the core product boundary.

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

## Target Directory Shape

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
| Health | summary, logs |
| Finance | summary, logs |
| Goals | list, create |
| Reminders | list, create |
| Memory | search, recent, create, update later |
| Settings | profile, notifications, AI preferences later |
| Notifications | list, mark read, test later |
| Admin | health, metrics, jobs, AI usage, workflows later |

---

## Request Flow

1. API route validates request and auth context.
2. Dependency layer loads current user from the access token.
3. Session service handles refresh token validation and current-session mutation.
4. Placeholder routes either return contract data or acknowledgement messages.
5. Agent writes are still proposed first, but real confirmation-save flow is not persisted yet.
6. Workflow routes still enforce shared-secret validation.

---

## Current Implemented Shape

```text
backend/
  app/
    api/
      dependencies.py
      routes/
    auth/
      firebase.py
      sessions.py
      tokens.py
    agents/
      base.py
      registry.py
      orchestrator/
      health/
      finance/
      memory/
    config/
      settings.py
    database/
      session.py
    schemas/
    main.py
  tests/
  main.py
  README.md
  SETUP.md
```

---

## Current Implementation Slice

Implemented today:

- settings loader with `.env` support
- FastAPI app factory and route registration
- health check route
- database session placeholder
- auth schemas and request or response models
- dummy Google verification adapter
- JWT helper and in-memory session service
- auth routes with dependency boundaries
- session mutation helpers for profile, onboarding-complete, and Telegram-link flags
- agent base contract, registry, orchestrator, health agent, finance agent, and memory retriever stub
- workflow webhook secret validation routes
- backend tests for app boot, auth flow shape, token helpers, agent routing, and workflow secret checks

---

## Next Implementation Slice

Build persistence and real verification behind the existing contract surface:

- replace the dummy Google verifier with real Firebase Admin verification
- add PostgreSQL models and migrations
- replace the database placeholder with real async session management
- persist users, providers, sessions, onboarding state, and Telegram link records
- add real service-layer logic behind dashboard, reminders, goals, settings, onboarding, and domain routes
- expand tests from scaffold coverage to persistence and contract behavior

Current scaffold exists in:

- `../../backend/app/main.py`
- `../../backend/app/api/routes/`
- `../../backend/app/auth/`
- `../../backend/app/agents/`
- `../../backend/tests/`
