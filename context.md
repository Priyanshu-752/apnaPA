# apnaPA Project Context

**Last Updated**: 2026-05-14  
**Project**: apnaPA AI Personal Manager  
**Status**: Backend scaffold and first frontend-backend auth/session slice are implemented and verified  
**Primary Plan**: `plan.md`

---

## Current State

### In Progress

- The frontend is no longer a pure dummy scaffold. It now has a partial integration layer: Google Identity Services login UI, cookie-backed Next.js route handlers, backend bootstrap loading, backend-backed agent chat, and backend-backed writes for profile, onboarding, Telegram connect, health logs, finance logs, and goals.
- The backend still uses intentional placeholder internals for identity verification and persistence. Google token verification is still dummy, sessions remain in-memory, and most domain routes still return placeholder data or acknowledgement messages.
- Project context is still split across `context.md`, `context_backend.md`, and `context_frontend.md`, and that split remains the right working model for future sessions.

### Completed

- Long-form product plan created for apnaPA MVP and future phases.
- Dashboard HTML prototype created as the visual baseline.
- Root-level context pipeline, logs, checkpoints, and documentation workflow created.
- Frontend converted into a Next.js App Router app under `frontend/src/`.
- Auth and dashboard route groups added with separate pages for dashboard, health, finance, reminders, memory, and settings.
- Middleware-based protected routes added around dashboard screens.
- Shared dashboard shell, dialogs, route-based screens, responsive sidebar, and route contract tests added.
- FastAPI backend scaffold created with route registration, settings loading, auth/session helpers, protected dependencies, orchestrator stubs, and workflow secret validation.
- Backend auth routes added for Google token exchange, `/me`, refresh, and logout.
- Backend agent registry, orchestrator, health agent, finance agent, and memory retriever stub added.
- Frontend now uses the official Google Identity Services button and exchanges the credential through `frontend/src/app/api/auth/google/route.ts`.
- Next.js route handlers now proxy browser requests to FastAPI and manage session cookies through `frontend/src/lib/backend-route.ts`.
- Frontend bootstrap loading now hydrates user, overview, activity, and insights through `/api/app/bootstrap`.
- Frontend toasts now preserve backend `message` and validation `detail` text rather than generic local strings.
- Dashboard agent chat now calls the backend orchestrator through `/api/agent/chat`.
- Profile update, onboarding complete, Telegram connect, health log, finance log, goal save, and logout now call backend-backed routes.
- Backend in-memory sessions now mutate profile, onboarding, and Telegram-linked state for the current user session.
- Frontend tests, backend tests, and frontend production build are all passing for the current slice.

### Next Steps

1. Replace the dummy Firebase verifier with real Firebase Admin verification against the browser client audience.
2. Add PostgreSQL models, migrations, and real async session or persistence boundaries.
3. Persist canonical users, auth providers, sessions, onboarding state, Telegram link records, profile settings, goals, reminders, and dashboard state.
4. Replace placeholder dashboard, onboarding, Telegram, health, finance, reminder, and goal responses with real service-layer logic.
5. Decide whether the frontend should keep expanding through Next route handlers only or introduce TanStack Query once more backend contracts stabilize.
6. Extend frontend integration beyond the current bootstrap and action slice so health, finance, reminders, memory, and settings read from server state instead of dummy data.
7. Add integration coverage for the browser Google handoff, cookie refresh flow, onboarding, Telegram linking, and backend-backed dashboard actions.

### Blockers

- No hard blocker is preventing the next slice.
- Current limits are intentional and still important: dummy Google verification, in-memory sessions, placeholder dashboard data, dummy memory retrieval, and no real database or external integrations.
- Google sign-in requires a valid `Web application` OAuth client with correct local origins configured in Google Cloud before the browser flow will work.

---

## Tech Stack

| Area | Current or Planned Technology |
| --- | --- |
| Frontend | Next.js, TypeScript, TailwindCSS, Zustand, Zod, motion, browser `fetch`, TanStack Query later |
| Frontend Auth UI | Google Identity Services |
| Frontend Server Boundary | Next.js App Router route handlers and `next/headers` cookies |
| Backend | FastAPI, Python, Pydantic Settings, PyJWT, async persistence later |
| Auth | Google browser credential -> Next.js route handler -> FastAPI session exchange |
| Database | PostgreSQL planned, in-memory session mutation currently |
| Vector Memory | Qdrant planned, stub retriever currently |
| Cache and Queues | Redis later |
| Workers | Celery or Dramatiq later |
| AI | OpenAI models later, orchestrator stub currently |
| Automation | n8n webhook contracts implemented, workflow engine later |
| External Channel | Telegram linking routes scaffolded, webhook still placeholder |

---

## Key Decisions

1. **FastAPI remains the source of truth**: even with Next.js route handlers added, the frontend still proxies to FastAPI rather than owning business rules.
2. **Next.js owns browser-safe session handling**: the browser talks to local App Router API routes, which set and refresh `httpOnly` cookies and normalize backend responses.
3. **Dashboard users are canonical**: Telegram remains a linked channel, not an identity source.
4. **Confirmed AI writes still matter**: the backend-backed agent chat returns confirmation-oriented responses even though actual persistence is still placeholder.
5. **Partial integration is acceptable before persistence**: the project has moved past pure mock mode, but only the auth/session shell and a small action slice are integrated so far.
6. **Context stays split by surface**: `context.md`, `context_backend.md`, and `context_frontend.md` remain the preferred maintenance model.

See `decisions/` for future ADRs.

---

## Documentation Map

| Document | Purpose |
| --- | --- |
| `critical_prompt.md` | Product north star and MVP principles |
| `plan.md` | Full master plan and implementation sequence |
| `context.md` | Whole-app current state and cross-surface next steps |
| `context_backend.md` | Backend-specific implementation state, placeholders, and next steps |
| `context_frontend.md` | Frontend-specific implementation state, integration boundary, and next steps |
| `dashboard.html` | Current dashboard visual prototype |
| `frontend/` | Current Next.js frontend with partial backend integration |
| `backend/` | Current FastAPI backend scaffold and in-memory session slice |
| `project_refresh_prompt.md` | Reusable prompt to refresh project docs and context after major work |
| `learn/` | Learning docs for backend, agents, RAG, n8n, FastAPI, and tests |
| `architecture/` | Living architecture docs |
| `plans/` | Feature and implementation plans |
| `test_index/` | Test registry and module-level coverage notes |
| `logs/` | Development activity history |
| `context_checkpoints/` | Resumable project snapshots |

---

Update this file after major work steps so new sessions can start without reconstructing full project state from code.
