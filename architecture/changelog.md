# Architecture Changelog

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
