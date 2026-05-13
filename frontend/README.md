# apnaPA Next.js Frontend

This is the route-based Next.js + TypeScript frontend pass for apnaPA.

It still uses dummy data and has no API integration yet, but the structure is now aligned around App Router route groups, protected dashboard pages, and a dedicated `src` layout.

## Stack

- Next.js App Router with `src/app`.
- TypeScript.
- Tailwind CSS.
- shadcn-style local UI primitives in `src/components/ui`.
- `motion/react` for transitions and chart animation.
- Zustand for UI state.
- Zod for dummy data and form validation.
- Middleware-protected dashboard routes.

---

## Run

```bash
npm.cmd install --prefix frontend
npm.cmd run dev --prefix frontend
```

Then open:

```text
http://localhost:3000
```

---

## Test

```bash
npm.cmd test --prefix frontend
```

The tests use Node's built-in test runner through `tsx`.

---

## What Is Implemented

- Auth route group with `/login`.
- Dashboard route group with separate pages for `/dashboard`, `/health`, `/finance`, `/reminders`, `/memory`, and `/settings`.
- Protected route middleware using a local demo session cookie.
- Shared dashboard shell with sidebar, header, dialogs, and responsive mobile drawer behavior.
- Dummy onboarding completion state.
- Dummy Telegram link state.
- Manual meal and expense dialogs.
- Dashboard Agent dialog with deterministic mock replies and write-confirmation style responses.
- Tests for dummy data, Agent behavior, route structure, middleware guards, and required screen sections.

---

## What Is Not Implemented Yet

- Firebase login.
- FastAPI API calls.
- Real Telegram linking.
- Real persistence.

The future API implementation should preserve the route and screen boundaries while replacing dummy state with real auth, server data, and persistence.
