# apnaPA Learning Map

This folder explains what is being built and why. The project is intentionally structured so you can learn backend engineering, agent architecture, RAG, n8n automation, and testing while apnaPA grows.

---

## How To Use This Folder

Read in this order:

1. `backend/implementation-roadmap.md`
2. `fastapi/core-concepts.md`
3. `agents/how-agents-work.md`
4. `n8n/workflow-role.md`
5. `n8n/connecting-n8n-to-backend.md`
6. `rag/rag-memory-plan.md`
7. `testing/dummy-first-testing.md`
8. `resources/official-links.md`
9. `resources/video-guides.md`

---

## Current Learning Phase

We are in the scaffolded backend phase:

- Frontend uses local dummy data.
- Backend now has a real FastAPI scaffold under `backend/`.
- Auth, protected dependencies, route groups, workflow webhook guards, and agent contracts now exist.
- Agent replies in the frontend are still local mocks until the frontend is wired to FastAPI.
- Tests now validate backend contracts before real persistence and model calls are connected.

---

## Learning Rule

Every new backend, agent, RAG, n8n, or testing implementation should add or update a learning note here before or alongside the code. That way the repo becomes both the product and the course.
