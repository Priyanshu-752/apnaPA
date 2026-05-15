# Frontend Prototype And Partial Integration

The frontend is now a route-based Next.js app with a partial backend integration slice.

It still uses local dummy data for much of the dashboard read surface, but auth, session handling, bootstrap loading, backend agent chat, and several write flows now go through local App Router route handlers into FastAPI.

---

## Run

Create the env file:

```bash
Copy-Item frontend/.env.example frontend/.env
```

Set:

```env
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-web-oauth-client-id.apps.googleusercontent.com
APNAPA_BACKEND_URL=http://127.0.0.1:8000
```

Run:

```bash
npm.cmd run dev --prefix frontend
```

Open:

```text
http://localhost:3000
```

---

## Test

```bash
npm.cmd test --prefix frontend
npm.cmd run build --prefix frontend
```

---

## Included Flows

- Google login page using the official Google button
- Protected auth and dashboard route groups
- Cookie-backed session gate in middleware
- Dashboard overview bootstrap from backend overview, activity, and insight routes
- Dashboard daily state engine, weekly trend, AI insight, recent activity, and pending reminders
- Health range toolbar, nutrition progress, streaks, active goal, AI suggestions, and daily summaries
- Finance range toolbar, spending metrics, active goal, AI suggestions, category breakdown, and daily summaries
- Reminder queue and automation rules
- Memory preview
- Settings with backend-backed editable profile details
- Manual meal entry with backend call
- Manual expense entry with backend call
- Goal save with backend call
- Dashboard Agent backend chat
- Backend-backed onboarding completion
- Backend-backed Telegram link token and placeholder confirm

---

## Current Integration Boundary

The frontend now uses `fetch` and local `/api` routes, but the integration is intentionally partial.

What is server-backed now:

- Google credential exchange
- logout
- current-session bootstrap
- profile save
- onboarding complete
- Telegram link token and confirm
- health log submit
- finance log submit
- goal save
- dashboard agent chat

What is still local or placeholder:

- most dashboard read models
- reminder state beyond a few UI interactions
- detail drilldowns
- backend persistence for profile, onboarding, Telegram, health, finance, and goals
- real Firebase Admin verification

The current App Router scaffold should preserve the Dashboard, Health, Finance, and Reminders content from `dashboard.html` while more of the backend contracts are replaced with real data.
