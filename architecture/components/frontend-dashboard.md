# Frontend Dashboard Architecture

**Status**: Route-based Next.js dummy scaffold implemented  
**Source**: `../../plan.md`, `../../dashboard.html`

---

## Purpose

The frontend is the visual control surface for apnaPA. It handles authentication UI, onboarding, dashboard analytics, manual structured entry, settings, notifications, and the in-app Dashboard Agent.

The frontend does not own business logic. It calls FastAPI for user state, domain data, AI orchestration, and writes.

---

## Planned Stack

| Layer | Technology |
| --- | --- |
| App Framework | Next.js |
| Language | TypeScript |
| Styling | TailwindCSS |
| UI Components | Shadcn UI |
| Server Cache | TanStack Query |
| Client UI State | Zustand |
| Auth Provider UI | Firebase Google Login |

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
    components/
      auth/
      dashboard/
      ui/
    lib/
    stores/
    middleware.ts
  public/
  tests/
```

---

## State Ownership

| State | Owner |
| --- | --- |
| Server data | TanStack Query |
| Access token and user shell | `auth-store` |
| Open Agent dialog and draft messages | `conversation-store` |
| Notification panel state and local unread hints | `notification-store` |
| Dashboard filters, ranges, sidebar, and UI preferences | `dashboard-store` |
| Business rules and persisted writes | FastAPI |

---

## Main Views

| View | Purpose |
| --- | --- |
| Login | Google login through Firebase, then FastAPI auth exchange |
| Onboarding | Collect timezone, health, finance, reminder, and AI preference inputs |
| Dashboard Overview | Health, finance, reminders, activity, goals, and AI insights |
| Health | Daily and range summaries, meal table, details dialog, health goals |
| Finance | Spending summaries, category breakdown, transactions, budgets, finance goals |
| Reminders | Upcoming, missed, completion, snooze, preferences |
| Memory | Recent preferences, long-term goals, summaries, search later |
| Settings | Profile, timezone, Telegram link status, notification channels, AI style, privacy |
| Dashboard Agent | In-app chat using `/api/agent/chat` |

---

## API Interaction Pattern

1. Firebase UI obtains a Google identity token.
2. Frontend posts the identity token to `POST /api/auth/google`.
3. FastAPI returns app session data and access token behavior.
4. Protected routes load `/api/auth/me`.
5. TanStack Query fetches dashboard modules and invalidates after writes.
6. Manual forms post structured data to FastAPI.
7. Dashboard Agent sends natural-language requests to `/api/agent/chat`.
8. Agent-proposed writes are shown for confirmation before final save.

---

## Design Rules

- Use `dashboard.html` as the visual baseline.
- Build the usable app first, not a marketing landing page.
- Keep operational views dense, calm, and easy to scan.
- Provide loading, empty, error, and skeleton states for every data module.
- Use dialogs for structured entry and daily detail drilldowns.
- Use stable dimensions for cards, tables, counters, and controls.
- Keep manual entry and Agent entry separate but connected.

---

## Current Implementation Slice

Implemented in `../../frontend/`:

- Next.js App Router scaffold using `src/app`.
- Route groups for `(auth)` and `(dashboard)`.
- Protected routes via `src/middleware.ts` and a local demo session cookie.
- Shared dashboard shell with responsive sidebar, topbar, dialogs, and route-based screen components.
- Local dummy state for onboarding, Telegram linking, profile editing, dashboard modules, manual entry, and Dashboard Agent.
- Dashboard, Health, Finance, Reminders, Memory, and Settings are now separate screens and URLs.
- No API integration yet.
- Node built-in tests for dummy data, Agent behavior, route contracts, and middleware presence.

Run:

```bash
npm.cmd run dev --prefix frontend
npm.cmd test --prefix frontend
```

---

## Next Implementation Slice

When backend contracts are ready, extend the current scaffold instead of replacing it:

- Add Firebase Google handoff plus FastAPI auth exchange.
- Add API client and TanStack Query.
- Replace demo cookie auth with real session verification.
- Connect route-based dashboard screens to FastAPI-backed data.
- Add loading, empty, and error states around real server data modules.
