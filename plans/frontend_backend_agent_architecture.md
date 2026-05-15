# Frontend, Backend, and Agent Architecture Plan

**Status**: In Progress  
**Priority**: High  
**Source**: `../plan.md`

---

## Summary

Implement apnaPA as a FastAPI-owned AI backend with a dashboard and a shared agent runtime used by both Telegram and Dashboard Agent.

The frontend route scaffold is already in place. The backend scaffold already covers app boot, auth/session helpers, route registration, agent routing stubs, and workflow secret contracts. The frontend has now crossed into a first real integration slice through Google Identity Services, Next.js route handlers, cookie-backed session management, backend bootstrap loading, backend agent chat, and a first set of backend-backed writes.

The next major phase is replacing placeholder verification and in-memory mutation with real persistence and broader server-backed reads.

---

## Backend Plan

- Keep the current `backend/` scaffold stable while adding persistence behind it.
- Replace the dummy Google verification adapter with real Firebase Admin verification.
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

- Keep the existing route groups, screen boundaries, and visual baseline from `dashboard.html`.
- Keep the Next.js route-handler auth and cookie boundary unless there is a strong reason to move sensitive session logic into direct browser-to-backend calls.
- Add TanStack Query when enough backend read contracts are stable to justify shared caching and invalidation.
- Expand the current server-backed slice from auth, bootstrap, and selected writes into health, finance, reminders, memory, and settings reads.
- Preserve backend success and validation wording in the UI wherever it helps users understand failures.
- Add onboarding flow with resumable steps backed by FastAPI.
- Keep Dashboard Agent connected to `/api/agent/chat`.
- Replace remaining dummy reminder and detail flows only after their backend contract is shaped.

---

## Build Order

### Completed Foundation

1. Frontend dummy mock with dashboard, modules, local Agent behavior, and tests.
2. Learning docs for backend, FastAPI, agents, RAG, n8n, and testing.
3. Backend scaffold and health route with tests.
4. Backend auth foundation and test harness.
5. Agent base contract, registry, orchestrator shell, stubs, and agent tests.
6. n8n workflow contract surface and shared-secret validation.
7. Frontend Google login UI, Next.js route handlers, session-cookie bridge, backend bootstrap, and first backend-backed dashboard actions.
8. Backend current-session mutation for profile, onboarding, and Telegram placeholder state.

### Next Build Order

1. Real Firebase verification and persistence-backed auth state.
2. Database models, migrations, and async session management.
3. Onboarding persistence and initial state setup.
4. Telegram linking and webhook guardrails with stored link records.
5. Health and finance services, tools, logs, and summaries.
6. Daily state, goals, reminders, notifications, and events.
7. Qdrant memory interfaces and retrieval.
8. Broader frontend server-backed reads after backend contracts stabilize.
9. Full integration tests across auth, onboarding, Telegram, agent, and dashboard flows.

---

## Acceptance Criteria

- Backend starts locally and exposes health, auth, onboarding, Telegram, dashboard, agent, health, finance, reminders, goals, memory, settings, and admin route groups.
- Dashboard users are canonical, and Telegram accounts cannot access personal data before linking.
- Dashboard Agent and Telegram use the same orchestrator and tool flow.
- AI-generated writes are validated and require confirmation.
- Manual dashboard writes bypass AI but still use backend validation and user isolation.
- Frontend modules have loading, empty, error, and success states as integration expands.
- The current frontend route scaffold can run, test, and build locally with protected routes, separate screens, Google login UI, and the session-cookie bridge.
- Tests cover auth/session helpers, agent routing, workflow validation, and the current frontend route-handler integration surface.

---

## Related Architecture

- `../architecture/components/backend-core.md`
- `../architecture/components/frontend-dashboard.md`
- `../architecture/components/agent-system.md`
- `../architecture/diagrams/system-data-flow.md`
