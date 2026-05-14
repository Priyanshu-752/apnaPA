# apnaPA Architecture

**Last Updated**: 2026-05-14  
**Status**: Target architecture defined, frontend and backend scaffolds implemented  
**Source**: `../plan.md`

---

## Overview

apnaPA uses FastAPI as the central AI and product backend. Telegram and the dashboard are channels into the same orchestrator, memory service, tools, and confirmation rules.

```text
Google OAuth
  -> Firebase Authentication
  -> FastAPI Auth + Core Backend <-> Next.js Dashboard
       |                         \-> Dashboard Agent
       |-> Orchestrator Agent
       |-> Health Agent
       |-> Finance Agent
       |-> Memory Service
       |-> Reminder Service
       |-> Onboarding Service
       |-> Event Bus
       |-> Background Workers
       |-> OpenAI APIs
       |-> PostgreSQL
       |-> Qdrant Vector Memory
       |-> Redis Queue / Cache
       \-> n8n Automation Layer -> Telegram Bot / Email / Future Channels
```

---

## Components

| Component | Responsibility |
| --- | --- |
| FastAPI Core Backend | Auth, sessions, orchestration, business logic, memory, events, API surface |
| Firebase Authentication | Google OAuth identity verification only |
| Next.js Dashboard | Visual control surface, analytics, manual entry, Dashboard Agent |
| Telegram Bot | Primary external conversation channel after secure linking |
| n8n | Cron, retries, delivery workflows, weekly reports, inactivity checks |
| Orchestrator Agent | Intent detection, memory retrieval, agent routing, tool calls, confirmation rules |
| Health Agent | Meal parsing, nutrition estimates, health logs, goals, summaries |
| Finance Agent | Expense parsing, categorization, finance logs, budgets, summaries |
| Memory Service | User-scoped memory storage, retrieval, summarization, embeddings |
| Event Bus | Immutable domain events for summaries, analytics, reminders, and notifications |
| PostgreSQL | Structured users, auth, logs, goals, reminders, events, messages, usage logs |
| Qdrant | Vector memory keyed by user id and memory id |
| Redis and Workers | Later queue, cache, rate limiting, retries, and background processing |

Component deep dives:

- `components/backend-core.md`
- `components/frontend-dashboard.md`
- `components/agent-system.md`

---

## Key Invariants

1. FastAPI is the source of truth for users, sessions, onboarding, Telegram linking, product state, and AI decisions.
2. Firebase validates provider identity only.
3. Telegram users must be linked to authenticated dashboard users before accessing personal data.
4. The orchestrator is the only entry point for agent coordination.
5. Sub-agents do not independently send user-facing messages.
6. AI-generated writes require schema validation, user confirmation, and audit logs.
7. User data is isolated by `user_id` in PostgreSQL and Qdrant.
8. Important state changes emit immutable events.

---

## Target Backend Shape

```text
backend/
  app/
    api/
    auth/
    agents/
    tools/
    workflows/
    services/
    database/
    models/
    schemas/
    vector_memory/
    events/
    queues/
    prompts/
    utils/
    observability/
    config/
  main.py
  requirements.txt
```

---

## Target Frontend Shape

```text
frontend/
  src/
    app/
    components/
    lib/
    stores/
    middleware.ts
  tests/
  public/
```

---

## Current State

- Product architecture is planned in detail.
- Backend, frontend, and agent architecture docs are split into component plans.
- System data flows are documented in `diagrams/system-data-flow.md`.
- Dashboard HTML prototype remains the frontend visual baseline.
- Frontend application scaffold exists as a route-based Next.js app with protected dashboard routes, local dummy state, manual entry dialogs, and dashboard-agent mock behavior.
- Backend application scaffold exists as a FastAPI app with settings loading, auth/session helpers, route registration, protected dependencies, workflow secret validation, and agent routing stubs.
- The current implementation boundary is clear: route and contract scaffolds exist across both surfaces, but persistence and live integrations are still placeholder.
- The next architecture priority is moving backend contracts from placeholder to real persistence and identity verification without breaking current frontend route boundaries.

---

## Related

- `../critical_prompt.md`
- `../plan.md`
- `../plans/mvp_implementation_order.md`
- `../plans/frontend_backend_agent_architecture.md`
- `changelog.md`
