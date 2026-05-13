# apnaPA Project Context

**Last Updated**: 2026-05-13  
**Project**: apnaPA AI Personal Manager  
**Status**: Route-based Next.js frontend scaffold ready  
**Primary Plan**: `plan.md`

---

## Current State

### In Progress

- Route-based frontend scaffold is complete and tested.
- Backend FastAPI scaffold is the next implementation target.
- Product and master architecture planning exist in `plan.md`.
- Dashboard visual direction exists in `dashboard.html`.

### Completed

- Long-form product plan created for apnaPA MVP and future phases.
- Dashboard HTML prototype created as the current visual guide.
- Reference context pipeline reviewed and adapted into an apnaPA-specific structure.
- Root-level agentic context pipeline created.
- Backend core, frontend dashboard, and agent system architecture docs created.
- Frontend/backend/agent implementation plan created.
- System ownership boundaries recorded in ADR-001.
- Frontend mock created in `frontend/` using local dummy data and no API integration.
- Frontend tests added and passing with Node's built-in test runner.
- Frontend mock expanded to preserve the Dashboard, Health, Finance, and Reminders sections from `dashboard.html` before Next.js conversion.
- Frontend converted into a Next.js App Router app under `frontend/src/`.
- Auth and dashboard route groups added with separate pages for dashboard, health, finance, reminders, memory, and settings.
- Middleware-based protected routes added using a local demo session cookie.
- Shared dashboard shell added with responsive sidebar, topbar, dialogs, and route-based screen components.
- Profile editing, onboarding, Telegram linking, manual entry dialogs, and Agent dialog now live inside the route-based app.
- Frontend tests updated to TypeScript and now validate route structure, middleware guards, and the current screen surface.
- Learning folder added for backend, FastAPI, agents, RAG, n8n, testing, and official resources.

### Next Steps

- Create the backend FastAPI scaffold.
- Replace demo cookie auth with real Firebase-to-FastAPI auth handoff.
- Add TanStack Query and an API client when backend contracts exist.
- Create backend dummy tests before real integrations.
- Create agent base contract and dummy tests before OpenAI integration.
- Implement users, auth providers, sessions, JWT access tokens, refresh tokens, and auth middleware.
- Implement onboarding persistence and initial AI profile, goal, and reminder setup.
- Create PostgreSQL models and migrations.
- Implement secure Telegram linking and webhook guardrails.
- Implement orchestrator shell, agent registry, health tools, finance tools, daily state engine, memory, reminders, and n8n contracts.

### Blockers

None currently.

---

## Tech Stack

| Area | Planned Technology |
| --- | --- |
| Frontend | Next.js, TypeScript, TailwindCSS, Zustand, TanStack Query, Shadcn UI |
| Backend | FastAPI, Python, Pydantic, Async SQLAlchemy or SQLModel |
| Auth | Firebase Authentication for Google OAuth, FastAPI-owned sessions and JWTs |
| Database | PostgreSQL |
| Vector Memory | Qdrant |
| Cache and Queues | Redis later |
| Workers | Celery or Dramatiq later |
| AI | OpenAI GPT models, speech-to-text, embeddings |
| Automation | n8n |
| External Channel | Telegram Bot |

---

## Key Decisions

1. **FastAPI owns product intelligence**: Firebase only verifies Google identity, and n8n only schedules or delivers workflows.
2. **Dashboard users are canonical**: Telegram accounts must link to authenticated dashboard users before accessing personal data.
3. **One orchestrator entry point**: Sub-agents do not communicate directly with users.
4. **Confirmed AI writes**: AI-generated writes require explicit user confirmation and audit logging.
5. **Context pipeline lives at root**: The reusable reference folder is removed after root docs are created.
6. **System ownership boundaries are accepted**: FastAPI owns backend intelligence and product state; frontend owns UI; agents run through the orchestrator.

See `decisions/` for future ADRs.

---

## Documentation Map

| Document | Purpose |
| --- | --- |
| `critical_prompt.md` | Product north star and MVP principles |
| `plan.md` | Full master plan and implementation sequence |
| `dashboard.html` | Current dashboard visual prototype |
| `frontend/` | Current route-based Next.js frontend scaffold |
| `project_refresh_prompt.md` | Reusable prompt to refresh project docs and context after major work |
| `learn/` | Learning docs for backend, agents, RAG, n8n, FastAPI, and tests |
| `architecture/` | Living architecture docs |
| `plans/` | Feature and implementation plans |
| `decisions/ADR-001-system-ownership-boundaries.md` | Accepted system ownership boundary |
| `test_index/` | Test registry and planned coverage |
| `logs/` | Development activity history |
| `context_checkpoints/` | Resumable project snapshots |

---

Update this file after major work steps so new sessions can start without reconstructing context.
