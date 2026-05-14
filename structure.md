# apnaPA Project Structure

**Last Updated**: 2026-05-14

---

```text
PersonalAgent/
|-- critical_prompt.md
|-- context.md
|-- context_backend.md
|-- context_frontend.md
|-- context_pipeline.md
|-- dashboard.html
|-- instructions.md
|-- plan.md
|-- project_refresh_prompt.md
|-- structure.md
|-- work_prompt.md
|
|-- architecture/
|   |-- README.md
|   |-- changelog.md
|   |-- components/
|   |   |-- README.md
|   |   |-- agent-system.md
|   |   |-- backend-core.md
|   |   `-- frontend-dashboard.md
|   `-- diagrams/
|       |-- README.md
|       `-- system-data-flow.md
|
|-- audits/
|   `-- README.md
|
|-- backend/
|   |-- .env.example
|   |-- README.md
|   |-- SETUP.md
|   |-- main.py
|   |-- requirements.txt
|   |-- __init__.py
|   |-- app/
|   |   |-- __init__.py
|   |   |-- main.py
|   |   |-- agents/
|   |   |   |-- base.py
|   |   |   |-- registry.py
|   |   |   |-- finance/
|   |   |   |-- health/
|   |   |   |-- memory/
|   |   |   `-- orchestrator/
|   |   |-- api/
|   |   |   `-- routes/
|   |   |-- auth/
|   |   |-- config/
|   |   |-- database/
|   |   `-- schemas/
|   `-- tests/
|       |-- test_agents.py
|       |-- test_app.py
|       |-- test_auth.py
|       |-- test_tokens.py
|       `-- test_workflows.py
|
|-- context_checkpoints/
|   |-- README.md
|   `-- context_checkpoint_*.md
|
|-- decisions/
|   |-- ADR-001-system-ownership-boundaries.md
|   `-- README.md
|
|-- docs/
|   |-- README.md
|   `-- frontend_mock.md
|
|-- errors/
|   `-- README.md
|
|-- frontend/
|   |-- README.md
|   |-- components.json
|   |-- global.d.ts
|   |-- next-env.d.ts
|   |-- next.config.mjs
|   |-- package.json
|   |-- postcss.config.mjs
|   |-- tailwind.config.ts
|   |-- tsconfig.json
|   |-- public/
|   |-- scripts/
|   |-- src/
|   |   |-- app/
|   |   |   |-- (auth)/
|   |   |   |-- (dashboard)/
|   |   |   |-- globals.css
|   |   |   |-- layout.tsx
|   |   |   `-- page.tsx
|   |   |-- components/
|   |   |   |-- auth/
|   |   |   |-- dashboard/
|   |   |   `-- ui/
|   |   |-- lib/
|   |   |-- stores/
|   |   `-- middleware.ts
|   `-- tests/
|       |-- agent.test.ts
|       |-- dummy-data.test.ts
|       `-- next-contract.test.ts
|
|-- knowledgebase/
|   `-- README.md
|
|-- learn/
|   |-- README.md
|   |-- agents/
|   |-- backend/
|   |-- fastapi/
|   |-- n8n/
|   |-- rag/
|   |-- resources/
|   `-- testing/
|
|-- logs/
|   |-- README.md
|   `-- YYYYMMDD_HHMM_*.md
|
|-- plans/
|   |-- README.md
|   |-- frontend_backend_agent_architecture.md
|   `-- mvp_implementation_order.md
|
`-- test_index/
    |-- index.md
    `-- modules/
        |-- README.md
        |-- backend.md
        `-- frontend.md
```

---

## Quick Navigation

| Need | Location |
| --- | --- |
| Product north star | `critical_prompt.md` |
| Full master plan | `plan.md` |
| Whole-app state | `context.md` |
| Backend state | `context_backend.md` |
| Frontend state | `context_frontend.md` |
| Backend app | `backend/app/` |
| Frontend app | `frontend/src/` |
| Backend setup guide | `backend/SETUP.md` |
| Documentation refresh prompt | `project_refresh_prompt.md` |
| Learning docs | `learn/` |
| Session workflow | `work_prompt.md` |
| Documentation rules | `instructions.md` |
| Context system details | `context_pipeline.md` |
| Architecture | `architecture/` |
| Implementation plans | `plans/` |
| Session logs | `logs/` |
| Resume checkpoints | `context_checkpoints/` |
| Test registry | `test_index/` |
| User/operator docs | `docs/` |
| Research findings | `knowledgebase/` |
| ADRs | `decisions/` |
| Error history | `errors/` |
| Audit reports | `audits/` |

---

Update this file when adding top-level folders or significantly changing key backend or frontend layout.
