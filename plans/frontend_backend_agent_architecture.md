# Frontend, Backend, and Agent Architecture Plan

**Status**: In Progress  
**Priority**: High  
**Source**: `../plan.md`

---

## Summary

Implement apnaPA as a FastAPI-owned AI backend with a dashboard and a shared agent runtime used by both Telegram and Dashboard Agent. The frontend route scaffold is already in place, and the backend scaffold now covers app boot, auth/session helpers, route registration, agent routing stubs, and workflow secret contracts. The next major phase is persistence and real integration behind those contracts.

---

## Backend Plan

- Keep the current `backend/` scaffold stable while adding persistence behind it.
- Replace the dummy Firebase verification adapter with real Firebase Admin verification.
- Persist FastAPI users, auth providers, sessions, access tokens, refresh tokens, and auth dependencies behind the current route surface.
- Add onboarding services and persistence before Telegram access.
- Add PostgreSQL models and migrations for users, auth, onboarding, Telegram linking, health, finance, goals, reminders, daily states, memories, events, summaries, conversations, notifications, AI usage, and AI actions.
- Add Telegram linking and webhook guardrails only after canonical dashboard users exist.
- Add domain services for health, finance, reminders, daily state, analytics, notifications, and settings.
- Add event bus and observability early enough that domain writes are traceable.

---

## Agent Plan

- Keep the shared agent contract, registry, orchestrator, and initial domain-agent stubs as the stable base.
- Add typed tools for health, finance, reminders, memory, and conversation persistence.
- Add confirmation proposal flow for AI-generated writes.
- Add memory retrieval through SQL filters plus Qdrant-backed semantic lookup.
- Add prompt versioning, AI action logs, AI usage logs, timeouts, retries, and fallback handling.

---

## Frontend Plan

- The frontend now runs on Next.js, TypeScript, TailwindCSS, Shadcn-style local UI, Zustand, and Node tests.
- Add TanStack Query when backend contracts are ready.
- Use `dashboard.html` as the visual baseline for layout, spacing, colors, and dashboard density.
- Keep Firebase and FastAPI API integration out until backend persistence and auth contracts are stable.
- Add Firebase Google login UI and FastAPI auth exchange in the integration phase.
- Add protected app shell with sidebar, topbar, notifications, Telegram link status, and settings entry.
- Add onboarding flow with resumable steps backed by FastAPI.
- Add dashboard overview, health, finance, reminders, goals, memory, settings, and activity modules.
- Add Dashboard Agent dialog connected to `/api/agent/chat`.
- Add manual entry dialogs for meals, expenses, reminders, and goals.

---

## Build Order

### Completed Foundation

1. Frontend dummy mock with dashboard, modules, local Agent behavior, and tests.
2. Learning docs for backend, FastAPI, agents, RAG, n8n, and testing.
3. Backend scaffold and health route with tests.
4. Backend auth foundation and test harness.
5. Agent base contract, registry, orchestrator shell, stubs, and agent tests.
6. n8n workflow contract surface and shared-secret validation.

### Next Build Order

1. Database models, migrations, and async session management.
2. Real Firebase verification and persistence-backed auth state.
3. Onboarding persistence and initial state setup.
4. Telegram linking and webhook guardrails with stored link records.
5. Health and finance services, tools, logs, and summaries.
6. Daily state, goals, reminders, notifications, and events.
7. Qdrant memory interfaces and retrieval.
8. Connect frontend modules to FastAPI after backend contracts stabilize.
9. Full integration tests across auth, onboarding, Telegram, agent, and dashboard flows.

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
