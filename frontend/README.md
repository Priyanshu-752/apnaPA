# apnaPA Next.js Frontend

This is the route-based Next.js + TypeScript frontend for apnaPA.

It is no longer a pure dummy pass. The app now has a partial backend integration layer for auth, session cookies, bootstrap loading, backend-backed agent chat, and a first set of backend-backed writes, while much of the dashboard read surface still uses local placeholder data.

## Stack

- Next.js App Router with `src/app`
- TypeScript
- Tailwind CSS
- shadcn-style local UI primitives in `src/components/ui`
- `motion/react` for transitions and chart animation
- Zustand for UI state
- Zod for form validation and typed dummy content
- Google Identity Services for browser sign-in
- App Router route handlers for browser-safe backend proxying

---

## Run

Create the frontend env file first:

```bash
Copy-Item frontend/.env.example frontend/.env
```

Required values:

- `NEXT_PUBLIC_GOOGLE_CLIENT_ID`
- `APNAPA_BACKEND_URL`

Then run:

```bash
npm.cmd install --prefix frontend
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

The tests use Node's built-in test runner through `tsx`.

---

## What Is Implemented

- Auth route group with `/login`
- Dashboard route group with separate pages for `/dashboard`, `/health`, `/finance`, `/reminders`, `/memory`, and `/settings`
- Protected route middleware using a session cookie
- `src/app` App Router structure with shared dashboard shell and route-based screens
- Shared dashboard shell with sidebar, header, dialogs, responsive mobile drawer behavior, and bootstrap loading
- Google Identity Services login UI
- Local App Router API routes for:
  - auth exchange and logout
  - app bootstrap
  - profile update
  - onboarding complete
  - Telegram link token and confirm
  - health logs
  - finance logs
  - goals
  - dashboard agent chat
- Cookie-backed backend proxy helpers in `src/lib/backend-route.ts`
- Toast UX that surfaces backend success and error messages
- Backend-backed profile, onboarding, Telegram connect, manual meal entry, manual expense entry, goal save, logout, and agent chat
- Tests for dummy data, agent behavior, route structure, middleware guards, and session-backed route presence

---

## What Is Still Placeholder

- Most dashboard reads outside bootstrap still use local dummy data
- Backend profile, onboarding, Telegram, health, finance, and goal writes are still placeholder acknowledgements backed by in-memory session state
- No TanStack Query data layer yet
- No browser automation or accessibility test coverage yet
- Real Firebase Admin verification is not wired on the backend yet

---

## Important Local Auth Setup

The browser login requires a Google OAuth `Web application` client.

Make sure the Google Cloud OAuth client has these origins, or the login page will fail with `invalid_client` or `no registered origin`:

- `http://localhost:3000`
- `http://127.0.0.1:3000`
- `http://localhost:3001`
- `http://127.0.0.1:3001`

Use the resulting client id in `NEXT_PUBLIC_GOOGLE_CLIENT_ID`.
