# apnaPA Project Structure

**Last Updated**: 2026-05-13

---

```text
PersonalAgent/
|-- critical_prompt.md
|-- context.md
|-- context_pipeline.md
|-- dashboard.html
|-- project_refresh_prompt.md
|-- frontend/
|   |-- .gitignore
|   |-- README.md
|   |-- components.json
|   |-- global.d.ts
|   |-- next-env.d.ts
|   |-- next.config.mjs
|   |-- package.json
|   |-- postcss.config.mjs
|   |-- tailwind.config.ts
|   `-- tests/
|       |-- agent.test.ts
|       |-- dummy-data.test.ts
|       `-- next-contract.test.ts
|   |-- public/
|   |   `-- ap-mark.svg
|   `-- src/
|       |-- app/
|       |   |-- globals.css
|       |   |-- layout.tsx
|       |   |-- page.tsx
|       |   |-- (auth)/
|       |   |   |-- layout.tsx
|       |   |   `-- login/
|       |   |       `-- page.tsx
|       |   `-- (dashboard)/
|       |       |-- layout.tsx
|       |       |-- dashboard/page.tsx
|       |       |-- health/page.tsx
|       |       |-- finance/page.tsx
|       |       |-- reminders/page.tsx
|       |       |-- memory/page.tsx
|       |       `-- settings/page.tsx
|       |-- components/
|       |   |-- auth/
|       |   |   `-- login-screen.tsx
|       |   |-- dashboard/
|       |   |   |-- dashboard-shell.tsx
|       |   |   |-- dialogs.tsx
|       |   |   |-- navigation.ts
|       |   |   |-- shared.tsx
|       |   |   |-- sidebar.tsx
|       |   |   |-- topbar.tsx
|       |   |   `-- screens/
|       |   `-- ui/
|       |-- lib/
|       |   |-- agent.ts
|       |   |-- dummy-data.ts
|       |   |-- schemas.ts
|       |   |-- session.ts
|       |   `-- utils.ts
|       |-- stores/
|       |   `-- app-store.ts
|       `-- middleware.ts
|-- instructions.md
|-- learn/
|   |-- README.md
|   |-- agents/
|   |   `-- how-agents-work.md
|   |-- backend/
|   |   `-- implementation-roadmap.md
|   |-- fastapi/
|   |   `-- core-concepts.md
|   |-- n8n/
|   |   `-- workflow-role.md
|   |-- rag/
|   |   `-- rag-memory-plan.md
|   |-- resources/
|   |   `-- official-links.md
|   `-- testing/
|       `-- dummy-first-testing.md
|-- plan.md
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
|-- context_checkpoints/
|   |-- README.md
|   |-- context_checkpoint_13-05-2026-11-14AM.md
|   |-- context_checkpoint_13-05-2026-11-27AM.md
|   |-- context_checkpoint_13-05-2026-11-40AM.md
|   `-- context_checkpoint_13-05-2026-12-08PM.md
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
|-- knowledgebase/
|   `-- README.md
|
|-- logs/
|   |-- README.md
|   |-- 20260513_1114_context_pipeline_setup.md
|   |-- 20260513_1127_frontend_backend_agent_architecture.md
|   |-- 20260513_1140_frontend_mock_and_learning_docs.md
|   `-- 20260513_1208_frontend_prototype_parity.md
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
        `-- frontend.md
```

---

## Quick Navigation

| Need | Location |
| --- | --- |
| Product north star | `critical_prompt.md` |
| Full master plan | `plan.md` |
| Current project state | `context.md` |
| Frontend app | `frontend/src/` |
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

Update this file when adding top-level folders or significantly changing the project layout.
