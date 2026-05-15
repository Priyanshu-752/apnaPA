# Architecture Changelog

## 2026-05-14

- Refreshed architecture docs to reflect the new Google Identity Services plus Next.js route-handler session bridge.
- Updated frontend architecture notes from pure dummy mode to partial backend integration mode.
- Updated backend architecture notes to capture current-session profile, onboarding, and Telegram mutation behavior.
- Updated system data-flow notes to reflect live auth, bootstrap, agent chat, and manual-write proxy flows.
- Refreshed architecture docs to reflect that both the frontend and backend scaffolds now exist.
- Recorded the split-context workflow using `context.md`, `context_backend.md`, and `context_frontend.md`.
- Updated backend architecture notes to distinguish implemented scaffold pieces from target long-term structure.
- Updated frontend architecture notes to reflect the current single Zustand store and still-planned API data layer.

## 2026-05-13

- Added root-level agentic context pipeline for apnaPA.
- Documented the target FastAPI, Next.js, Telegram, n8n, PostgreSQL, Qdrant, OpenAI, and agent architecture.
- Established that `plan.md` remains the long-form source of truth while `architecture/` tracks living implementation architecture.
- Added component architecture docs for backend core, frontend dashboard, and agent system.
- Added system data-flow documentation for auth, Telegram linking, conversation, and manual dashboard writes.
- Implemented first frontend mock in `frontend/` using local dummy data and tests.
- Added `learn/` documentation for backend, FastAPI, agents, RAG, n8n, testing, and official resources.
- Converted the frontend into a route-based Next.js App Router scaffold under `frontend/src/`.
- Added auth and dashboard route groups, protected-route middleware, responsive dashboard shell, and TypeScript route-contract tests.
- Added the first FastAPI backend scaffold with auth/session helpers, protected route dependencies, agent orchestrator stubs, workflow webhook contracts, and passing backend pytest coverage.
