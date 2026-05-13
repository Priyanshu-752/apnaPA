# Frontend Dashboard Architecture

**Status**: Static dummy mock implemented  
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
  app/
    layout.tsx
    page.tsx
    login/
    onboarding/
    dashboard/
    settings/
  components/
    ui/
    layout/
    forms/
    agent/
  modules/
    auth/
    onboarding/
    dashboard/
    health/
    finance/
    reminders/
    memory/
    settings/
  stores/
    auth-store.ts
    conversation-store.ts
    notification-store.ts
    dashboard-store.ts
  services/
    api-client.ts
    auth-service.ts
    agent-service.ts
    health-service.ts
    finance-service.ts
    reminder-service.ts
  hooks/
  lib/
  types/
  utils/
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

- Dependency-light static frontend mock.
- Dashboard UI adapted from `../../dashboard.html`.
- Local dummy state for login, onboarding, Telegram linking, dashboard modules, manual entry, and Dashboard Agent.
- Dashboard, Health, Finance, and Reminders sections expanded to match the important prototype coverage in `../../dashboard.html`.
- No API integration.
- Node built-in tests for dummy data, Agent behavior, and HTML contracts.

Run:

```bash
npm.cmd start --prefix frontend
npm.cmd test --prefix frontend
```

---

## Next Implementation Slice

When backend contracts are ready, migrate or replace this mock with the planned Next.js app:

- Next.js app shell.
- Tailwind and Shadcn setup.
- Auth store and API client.
- Login page with Firebase Google handoff placeholder or adapter.
- Protected dashboard route shell.
- Sidebar/topbar layout based on `dashboard.html`.
- Dashboard overview using mock data first, then FastAPI-backed data.
