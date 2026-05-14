# apnaPA Project Context

**Last Updated**: 2026-05-14  
**Project**: apnaPA AI Personal Manager  
**Status**: Frontend and backend scaffolds are both implemented and tested  
**Primary Plan**: `plan.md`

---

## Current State

### In Progress

- The frontend remains a route-based Next.js scaffold using local dummy data and a demo session cookie.
- The backend now exists as a FastAPI scaffold with auth/session helpers, route registration, agent routing stubs, and workflow webhook contracts.
- Project context is now split into `context.md`, `context_backend.md`, and `context_frontend.md` so each surface can be maintained independently.
- Product and long-range architecture still live in `plan.md`, while implementation truth is moving into code-backed docs.

### Completed

- Long-form product plan created for apnaPA MVP and future phases.
- Dashboard HTML prototype created as the current visual guide.
- Root-level context pipeline created for resumable AI-assisted development.
- Backend core, frontend dashboard, and agent system architecture docs created.
- System ownership boundaries recorded in ADR-001.
- Frontend converted into a Next.js App Router app under `frontend/src/`.
- Auth and dashboard route groups added with separate pages for dashboard, health, finance, reminders, memory, and settings.
- Middleware-based protected routes added using a local demo session cookie.
- Shared dashboard shell added with responsive sidebar, topbar, dialogs, route-based screen components, onboarding state, Telegram link state, profile editing, and local agent chat behavior.
- Frontend tests added and passing with Node's built-in test runner.
- Backend FastAPI app factory and route registration added under `backend/app/`.
- Backend auth flow added for Google token exchange, `/me`, refresh rotation, logout, and protected user dependencies.
- In-memory session lifecycle and JWT token helpers implemented for the current scaffold.
- Agent base contract, registry, orchestrator service, health agent, finance agent, and memory retriever stub added.
- Backend route groups added for admin, auth, onboarding, telegram, agent, conversation, dashboard, health, finance, reminders, goals, memory, settings, notifications, and workflows.
- n8n-style webhook secret validation added for workflow routes.
- Backend pytest coverage added for app boot, auth flow shape, token helpers, agent routing, and workflow secret checks.
- Backend environment/setup guide added in `backend/SETUP.md`.

### Next Steps

- Replace the dummy Firebase verifier with real Firebase Admin verification.
- Add PostgreSQL models, migrations, and real async database sessions.
- Persist onboarding, Telegram linking, goals, reminders, memory, and dashboard state.
- Replace backend placeholders with real domain services for health, finance, reminders, and settings.
- Add OpenAI-backed orchestration and Qdrant-backed memory retrieval.
- Keep frontend on dummy data until backend contracts stabilize, then add API client and TanStack Query.
- Replace the demo frontend session cookie with real Firebase-to-FastAPI auth handoff.
- Add integration tests across auth, onboarding, Telegram linking, agent chat, and dashboard data flows.

### Blockers

- No blocking dependency is preventing the next backend phase.
- The current limits are intentional placeholders: dummy Firebase verification, in-memory sessions, stub memory retrieval, no real database, and no live external integrations.

---

## Tech Stack

| Area | Current or Planned Technology |
| --- | --- |
| Frontend | Next.js, TypeScript, TailwindCSS, Zustand, Zod, motion, TanStack Query later |
| Backend | FastAPI, Python, Pydantic Settings, PyJWT, async persistence later |
| Auth | Firebase Authentication for Google OAuth, FastAPI-owned sessions and JWTs |
| Database | PostgreSQL planned, placeholder session currently |
| Vector Memory | Qdrant planned, stub retriever currently |
| Cache and Queues | Redis later |
| Workers | Celery or Dramatiq later |
| AI | OpenAI models later, orchestrator stub currently |
| Automation | n8n webhook contracts implemented, workflow engine later |
| External Channel | Telegram linking and webhook routes scaffolded |

---

## Key Decisions

1. **FastAPI owns product intelligence**: Firebase only verifies Google identity, and n8n only schedules or delivers workflows.
2. **Dashboard users are canonical**: Telegram accounts must link to authenticated dashboard users before accessing personal data.
3. **One orchestrator entry point**: Sub-agents do not communicate directly with users.
4. **Confirmed AI writes**: AI-generated writes require explicit user confirmation and audit logging.
5. **Context now has three layers**: `context.md` tracks whole-app state, while `context_backend.md` and `context_frontend.md` track implementation details for each surface.
6. **System ownership boundaries are accepted**: FastAPI owns backend intelligence and product state; frontend owns UI; agents run through the orchestrator.

See `decisions/` for future ADRs.

---

## Documentation Map

| Document | Purpose |
| --- | --- |
| `critical_prompt.md` | Product north star and MVP principles |
| `plan.md` | Full master plan and implementation sequence |
| `context.md` | Whole-app current state and cross-surface next steps |
| `context_backend.md` | Backend-specific implementation state, placeholders, and next steps |
| `context_frontend.md` | Frontend-specific implementation state, UI coverage, and next steps |
| `dashboard.html` | Current dashboard visual prototype |
| `frontend/` | Current route-based Next.js frontend scaffold |
| `backend/` | Current FastAPI backend scaffold |
| `project_refresh_prompt.md` | Reusable prompt to refresh project docs and context after major work |
| `learn/` | Learning docs for backend, agents, RAG, n8n, FastAPI, and tests |
| `architecture/` | Living architecture docs |
| `plans/` | Feature and implementation plans |
| `decisions/ADR-001-system-ownership-boundaries.md` | Accepted system ownership boundary |
| `test_index/` | Test registry and module-level coverage notes |
| `logs/` | Development activity history |
| `context_checkpoints/` | Resumable project snapshots |

---

Update this file after major work steps so new sessions can start without reconstructing full project state from code.
