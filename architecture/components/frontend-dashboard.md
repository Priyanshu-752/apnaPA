# Frontend Dashboard Architecture

**Status**: Route-based Next.js app with partial backend integration implemented  
**Source**: `../../plan.md`, `../../dashboard.html`

---

## Purpose

The frontend is the visual control surface for apnaPA. It handles authentication UI, onboarding, dashboard analytics, manual structured entry, settings, notifications, and the in-app Dashboard Agent.

The frontend still does not own business logic. It calls local Next.js route handlers, which in turn call FastAPI for user state, domain data, AI orchestration, and writes.

---

## Current Stack

| Layer | Technology |
| --- | --- |
| App Framework | Next.js |
| Language | TypeScript |
| Styling | TailwindCSS |
| UI Components | Shadcn-style local primitives |
| Client UI State | Zustand |
| Validation | Zod |
| Motion | `motion/react` |
| Browser Auth UI | Google Identity Services |
| Browser-to-Backend Boundary | App Router route handlers plus `next/headers` cookies |
| Server Cache | TanStack Query later |

---

## Directory Shape

```text
frontend/
  src/
    app/
      (auth)/
        login/
      (dashboard)/
        dashboard/
        health/
        finance/
        reminders/
        memory/
        settings/
      api/
        agent/chat/
        app/bootstrap/
        auth/google/
        auth/logout/
        finance/logs/
        goals/
        health/logs/
        onboarding/complete/
        settings/profile/
        telegram/link/
    components/
      auth/
      dashboard/
      ui/
    lib/
    stores/
    types/
    middleware.ts
  public/
  tests/
```

---

## State Ownership

| State | Current Owner | Planned Owner |
| --- | --- | --- |
| Browser session cookies | Next.js route handlers | Next.js route handlers |
| Access-token refresh behavior | `src/lib/backend-route.ts` | Same unless auth architecture changes |
| Bootstrap profile and overview state | `app-store.ts` hydrated from backend | TanStack Query or split stores later |
| Dialogs, ranges, agent chat transcript, local reminder completion | `app-store.ts` | Split stores if needed later |
| Most dashboard read models | Local dummy data | FastAPI-backed queries |
| Business rules and persisted writes | FastAPI placeholders | FastAPI real services |

---

## Main Views

| View | Purpose |
| --- | --- |
| Login | Google browser sign-in, then FastAPI session exchange through Next route handlers |
| Onboarding | Collect profile basics and complete onboarding through backend |
| Dashboard Overview | Health, finance, reminders, activity, and AI insights |
| Health | Daily and range summaries, meal table, details dialog, health goals |
| Finance | Spending summaries, category breakdown, transactions, budgets, finance goals |
| Reminders | Upcoming, missed, completion, snooze, preferences |
| Memory | Recent preferences, long-term goals, summaries, search later |
| Settings | Profile, timezone, Telegram link status, notification channels, AI style, privacy |
| Dashboard Agent | In-app chat using `/api/agent/chat` |

---

## API Interaction Pattern

1. Google Identity Services obtains a browser credential.
2. Frontend posts the credential to local `POST /api/auth/google`.
3. Next.js route handler exchanges it with FastAPI `POST /api/auth/google`.
4. Route handler stores `httpOnly` access, refresh, and session cookies.
5. Dashboard shell bootstraps `/api/app/bootstrap`.
6. Local App Router route handlers proxy selected writes and normalize backend success or error messages.
7. Dashboard Agent sends natural-language requests to local `/api/agent/chat`, which proxies to FastAPI.
8. Refresh flow is handled server-side when protected backend requests return `401`.

---

## Design Rules

- Use `dashboard.html` as the visual baseline.
- Build the usable app first, not a marketing landing page.
- Keep operational views dense, calm, and easy to scan.
- Preserve backend response wording in UI toasts when possible.
- Keep manual entry and Agent entry separate but connected.
- Expand server-backed modules gradually instead of replacing the working scaffold wholesale.

---

## Current Implementation Slice

Implemented in `../../frontend/`:

- Next.js App Router scaffold using `src/app`
- route groups for `(auth)` and `(dashboard)`
- protected routes via `src/middleware.ts` and the session cookie
- shared dashboard shell with responsive sidebar, topbar, dialogs, and bootstrap loading
- official Google sign-in UI in `src/components/auth/login-screen.tsx`
- backend proxy and cookie helpers in `src/lib/backend-route.ts`
- local client API wrappers in `src/lib/api.ts`
- backend-backed bootstrap, agent chat, profile save, onboarding complete, Telegram connect, health log, finance log, goal save, and logout
- local dummy data still used for most module reads
- Node built-in tests for dummy data, Agent behavior, route contracts, middleware presence, and session-backed route presence

Run:

```bash
npm.cmd run dev --prefix frontend
npm.cmd test --prefix frontend
npm.cmd run build --prefix frontend
```

---

## Next Implementation Slice

Extend the current integration boundary instead of replacing it:

- add real backend verification for browser Google credentials
- add server-backed read models for health, finance, reminders, memory, and settings
- decide when to introduce TanStack Query
- replace remaining dummy reminder and detail flows
- add loading, empty, and error states around more server-backed modules
