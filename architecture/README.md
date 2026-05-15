# apnaPA Architecture

**Last Updated**: 2026-05-14  
**Status**: Target architecture defined, backend scaffold implemented, frontend session bridge and partial integration live  
**Source**: `../plan.md`

---

## Overview

apnaPA uses FastAPI as the central AI and product backend. Telegram and the dashboard are channels into the same orchestrator, memory service, tools, and confirmation rules.

The dashboard now reaches FastAPI through a two-layer boundary:

```text
Browser
  -> Google Identity Services
  -> Next.js App Router UI
  -> Next.js route handlers and cookie/session bridge
  -> FastAPI Auth + Core Backend
       |-> Dashboard bootstrap routes
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
| Google Identity / Firebase Verification Layer | Browser identity acquisition and later server-side token verification |
| Next.js Dashboard UI | Visual control surface, analytics, manual entry, Dashboard Agent |
| Next.js Route Handlers | Browser-safe proxy, cookie storage, token refresh, response normalization |
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
2. The browser should not call FastAPI directly for sensitive session handling when the Next.js route-handler boundary can own `httpOnly` cookie management.
3. Google identity verification still belongs server-side even though the browser now obtains the credential.
4. Telegram users must be linked to authenticated dashboard users before accessing personal data.
5. The orchestrator is the only entry point for agent coordination.
6. Sub-agents do not independently send user-facing messages.
7. AI-generated writes require schema validation, user confirmation, and audit logs.
8. User data is isolated by `user_id` in PostgreSQL and Qdrant once persistence lands.

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
      api/
    components/
    lib/
    stores/
    types/
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
- Frontend application now includes:
  - route-based screens
  - protected dashboard routes
  - official Google sign-in UI
  - local route handlers for auth and dashboard actions
  - session-cookie management
  - backend bootstrap loading
  - backend-backed agent chat and selected writes
- Backend application now includes:
  - settings loading
  - auth/session helpers
  - protected dependencies
  - workflow secret validation
  - agent routing stubs
  - in-memory mutation for current-session profile, onboarding, and Telegram flags
- The current implementation boundary is no longer “no API integration.” It is now “partial backend integration through Next.js server routes, with persistence and real verification still placeholder.”
- The next architecture priority is replacing dummy verification and in-memory state with real persistence without breaking the current frontend session boundary.

---

## Related

- `../critical_prompt.md`
- `../plan.md`
- `../plans/mvp_implementation_order.md`
- `../plans/frontend_backend_agent_architecture.md`
- `changelog.md`
