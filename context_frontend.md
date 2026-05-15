# apnaPA Frontend Context

**Last Updated**: 2026-05-14  
**Status**: Route-based Next.js app with partial backend integration implemented and verified  
**Primary Surface**: `frontend/src/`

---

## Current State

- The frontend uses Next.js App Router under `frontend/src/app/`.
- Route groups exist for `(auth)` and `(dashboard)`.
- Protected dashboard routes are guarded by `frontend/src/middleware.ts` using the session cookie set through local Next.js route handlers.
- Separate dashboard pages exist for dashboard, health, finance, reminders, memory, and settings.
- The dashboard shell includes sidebar, topbar, dialogs, mobile drawer behavior, and an app-session bootstrap component.
- The frontend now has a browser-safe API layer:
  - client requests go through `frontend/src/lib/api.ts`
  - server route handlers live under `frontend/src/app/api/`
  - backend cookie and refresh handling lives in `frontend/src/lib/backend-route.ts`
- The login page now uses Google Identity Services and requires `NEXT_PUBLIC_GOOGLE_CLIENT_ID`.
- UI state remains centralized in `frontend/src/stores/app-store.ts`.

---

## Implemented Frontend Slices

### Routing and Shell

- Root page redirects into login or dashboard flow.
- Login page exists under the auth route group.
- Protected dashboard pages share the same layout and shell.
- Screen components separate the dashboard, health, finance, reminders, memory, and settings surfaces.

### Real Integration Slice

- `/login` renders the official Google button and exchanges the credential through `POST /api/auth/google`.
- Local App Router route handlers proxy to FastAPI for auth, bootstrap, profile, onboarding, Telegram, goals, health logs, finance logs, and agent chat.
- `AppSessionBootstrap` loads backend bootstrap state after dashboard entry.
- The topbar logout action now uses the backend logout flow.
- Dashboard agent chat now calls the backend orchestrator.
- Profile save, onboarding complete, Telegram connect, meal log, expense log, and goal save now call backend-backed actions.
- Toasts now preserve backend success and error messages instead of using fixed UI-only text.

### Still-Dummy or Partial Frontend Areas

- Health, finance, reminders, memory, and many dashboard cards still render local dummy content for most read paths.
- Reminder completion and some reminder actions remain local UI behavior.
- Detail drilldowns still use dummy meal and expense lists.
- The dashboard bootstrap only hydrates overview, activity, insights, and core profile/session state.
- There is still no TanStack Query data layer.

### Frontend Tests

- `frontend/tests/dummy-data.test.ts`
- `frontend/tests/agent.test.ts`
- `frontend/tests/next-contract.test.ts`

Current frontend test count from source: 14 Node test cases.

---

## Intentional Gaps

- No real Firebase token validation on the backend yet, even though the browser Google UI is wired.
- No persistent backend state yet for sessions, onboarding, Telegram links, dashboard reads, or domain data.
- No TanStack Query yet.
- No full server-backed dashboard module coverage yet.
- No browser-level rendering or accessibility coverage yet.

These are planned integration gaps, not missing scaffolding work.

---

## Next Frontend Steps

1. Keep the route and screen boundaries stable.
2. Expand the current integration slice from auth and actions into server-backed reads for health, finance, reminders, memory, and settings.
3. Decide when to introduce TanStack Query for caching, invalidation, and loading state management.
4. Add richer loading, empty, and error states around server-backed modules.
5. Add browser and accessibility coverage once more of the app stops depending on dummy data.
6. Keep local dummy data only where backend contracts are still intentionally incomplete.

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

Run production build:

```bash
npm.cmd run build --prefix frontend
```

---

Use this file for frontend-only refreshes while keeping `context.md` focused on whole-app state.
