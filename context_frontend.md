# apnaPA Frontend Context

**Last Updated**: 2026-05-14  
**Status**: Route-based Next.js scaffold implemented and tested  
**Primary Surface**: `frontend/src/`

---

## Current State

- The frontend uses Next.js App Router under `frontend/src/app/`.
- Route groups exist for `(auth)` and `(dashboard)`.
- Protected dashboard routes are guarded by `frontend/src/middleware.ts` using a local demo session cookie.
- Separate dashboard pages exist for dashboard, health, finance, reminders, memory, and settings.
- The dashboard shell includes sidebar, topbar, dialogs, and mobile drawer behavior.
- Local dummy data powers dashboard modules, onboarding state, Telegram link state, manual entry flows, and dashboard-agent replies.
- UI state is currently centralized in `frontend/src/stores/app-store.ts`.
- There is no backend API integration yet by design.

---

## Implemented Frontend Slices

### Routing and Shell

- Root page redirects into login or dashboard flow.
- Login page exists under the auth route group.
- Protected dashboard pages share the same layout and shell.
- Screen components separate the dashboard, health, finance, reminders, memory, and settings surfaces.

### Local UX Flows

- Profile editing dialog exists.
- Dummy onboarding completion state exists.
- Dummy Telegram linking state exists.
- Manual meal entry and expense entry dialogs exist.
- Dashboard Agent dialog exists with deterministic mock responses and confirmation-style drafts.

### Frontend Tests

- `frontend/tests/dummy-data.test.ts`
- `frontend/tests/agent.test.ts`
- `frontend/tests/next-contract.test.ts`

Current frontend test count from source: 14 Node test cases.

---

## Intentional Gaps

- No real Firebase login flow yet.
- No FastAPI API client yet.
- No TanStack Query yet.
- No server-backed dashboard data yet.
- No real persistence-backed onboarding, Telegram linking, or agent chat yet.
- No browser-level rendering or accessibility coverage yet.

These are planned integration gaps, not missing scaffolding work.

---

## Next Frontend Steps

1. Keep the existing route and screen boundaries stable.
2. Add Firebase UI handoff and FastAPI auth exchange when backend auth is real.
3. Add an API client and TanStack Query after backend contracts stabilize.
4. Replace demo cookie auth with real session verification.
5. Add loading, empty, and error states around server-backed data modules.
6. Add browser-level and accessibility tests once the data layer is real.

---

## Local Commands

Run frontend:

```bash
npm.cmd run dev --prefix frontend
```

Run frontend tests:

```bash
npm.cmd test --prefix frontend
```

---

Use this file for frontend-only refreshes while keeping `context.md` focused on whole-app state.