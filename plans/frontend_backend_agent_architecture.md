# Frontend, Backend, and Agent Architecture Plan

**Status**: Ready  
**Priority**: High  
**Source**: `../plan.md`

---

## Summary

Implement apnaPA as a FastAPI-owned AI backend with a dashboard and a shared agent runtime used by both Telegram and Dashboard Agent. The current phase is still dummy-first, but the frontend is now a route-based Next.js scaffold with protected routes and separate screen pages. The next major phase is backend and agent contract implementation before real integration.

---

## Backend Plan

- Scaffold `backend/` with FastAPI, settings, route registration, health check, database session, schemas, and test setup.
- Add auth foundation: Firebase verification adapter, FastAPI users, auth providers, sessions, access tokens, refresh tokens, and auth dependencies.
- Add onboarding services and persistence before Telegram access.
- Add PostgreSQL models and migrations for users, auth, onboarding, Telegram linking, health, finance, goals, reminders, daily states, memories, events, summaries, conversations, notifications, AI usage, and AI actions.
- Add Telegram linking and webhook guardrails only after canonical dashboard users exist.
- Add domain services for health, finance, reminders, daily state, analytics, notifications, and settings.
- Add event bus and observability early enough that domain writes are traceable.

---

## Agent Plan

- Build the shared agent contract, registry, execution context, intent enum, and structured response schema.
- Implement the orchestrator as the only channel-facing agent entry point.
- Add Health and Finance agents as domain workers behind the orchestrator.
- Add typed tools for health, finance, reminders, memory, and conversation persistence.
- Add confirmation proposal flow for AI-generated writes.
- Add memory retrieval through SQL filters plus Qdrant-backed semantic lookup.
- Add prompt versioning, AI action logs, AI usage logs, timeouts, retries, and fallback handling.

---

## Frontend Plan

- The frontend now runs on Next.js, TypeScript, TailwindCSS, Shadcn-style local UI, Zustand, and Node tests.
- Add TanStack Query when backend contracts are ready.
- Use `dashboard.html` as the visual baseline for layout, spacing, colors, and dashboard density.
- Keep Firebase and FastAPI API integration out until dummy UI, backend, and agent tests are stable.
- Add Firebase Google login UI and FastAPI auth exchange in the integration phase.
- Add protected app shell with sidebar, topbar, notifications, Telegram link status, and settings entry.
- Add onboarding flow with resumable steps backed by FastAPI.
- Add dashboard overview, health, finance, reminders, goals, memory, settings, and activity modules.
- Add Dashboard Agent dialog connected to `/api/agent/chat`.
- Add manual entry dialogs for meals, expenses, reminders, and goals.

---

## Build Order

1. Frontend dummy mock with dashboard, modules, local Agent behavior, and tests.
2. Learning docs for backend, FastAPI, agents, RAG, n8n, and testing.
3. Backend scaffold and health route with dummy tests.
4. Backend auth foundation and test harness.
5. Agent base contract, registry, orchestrator shell, stubs, and dummy tests.
6. Database models and migrations.
7. Onboarding persistence and initial state setup.
8. Telegram linking and webhook guardrails.
9. Health and finance services, tools, logs, and summaries.
10. Daily state, goals, reminders, notifications, and events.
11. Qdrant memory interfaces and retrieval.
12. n8n workflow contracts.
13. Add backend scaffold and auth/session contracts that match the current frontend route structure.
14. Connect frontend modules to FastAPI after dummy backend and agent tests pass.
15. Full integration tests across auth, onboarding, Telegram, agent, and dashboard flows.

---

## Acceptance Criteria

- Backend starts locally and exposes health, auth, onboarding, Telegram, dashboard, agent, health, finance, reminders, goals, memory, settings, and admin route groups.
- Dashboard users are canonical, and Telegram accounts cannot access personal data before linking.
- Dashboard Agent and Telegram use the same orchestrator and tool flow.
- AI-generated writes are validated and require confirmation.
- Manual dashboard writes bypass AI but still use backend validation, events, and user isolation.
- Domain writes update daily state or emit events needed for later aggregation.
- Frontend modules have loading, empty, error, and success states.
- The current frontend route scaffold can run and test locally with route guards, separate screens, and no backend dependency.
- Tests cover auth/session helpers, onboarding, Telegram linking, agent routing, health and finance logging, daily state, summaries, and protected dashboard APIs.

---

## Related Architecture

- `../architecture/components/backend-core.md`
- `../architecture/components/frontend-dashboard.md`
- `../architecture/components/agent-system.md`
- `../architecture/diagrams/system-data-flow.md`
