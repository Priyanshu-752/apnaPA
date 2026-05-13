# apnaPA Context Pipeline

This project uses a file-based context pipeline so human and AI coding sessions can resume work without losing product intent, architecture decisions, implementation state, and test history.

---

## Purpose

- Preserve session continuity through `context.md` and timestamped checkpoints.
- Keep `plan.md` as the full product and architecture source of truth.
- Track feature plans, implementation logs, decisions, errors, audits, knowledge, and tests.
- Make future coding sessions start from stable project context instead of chat memory.

---

## Layers

| Layer | Files |
| --- | --- |
| Vision | `critical_prompt.md`, `plan.md` |
| State | `context.md`, `context_checkpoints/`, `structure.md` |
| Process | `instructions.md`, `work_prompt.md`, `context_pipeline.md` |
| Planning | `plans/` |
| Architecture | `architecture/` |
| Knowledge | `knowledgebase/` |
| Decisions | `decisions/` |
| History | `logs/` |
| Errors | `errors/` |
| Audits | `audits/` |
| Tests | `test_index/` |
| User Docs | `docs/` |

---

## Session Lifecycle

### Start

1. Read `critical_prompt.md`.
2. Read `context.md`.
3. Review the latest file in `context_checkpoints/` if resuming.
4. Review relevant plans in `plans/`.
5. Use `plan.md` when full product, schema, API, or architecture detail is needed.

### Plan

1. Identify details that need verification.
2. Research current technical facts through official docs when needed.
3. Record durable findings in `knowledgebase/`.
4. Create or update focused files in `plans/`.
5. Create ADRs in `decisions/` for meaningful architecture choices.

### Build

1. Implement against the approved plan.
2. Keep code and docs aligned.
3. Add or update tests and `test_index/` when behavior changes.
4. Log non-trivial debugging work in `errors/`.

### Close

1. Create a session log in `logs/`.
2. Create a checkpoint in `context_checkpoints/`.
3. Update `context.md`.
4. Update `structure.md` if top-level structure changed.
5. Use `project_refresh_prompt.md` when a major implementation step has changed multiple docs or architecture notes.

---

## Naming Conventions

| Type | Format | Example |
| --- | --- | --- |
| Checkpoint | `context_checkpoint_DD-MM-YYYY-H-MMPM.md` | `context_checkpoint_13-05-2026-11-14AM.md` |
| Log | `YYYYMMDD_HHMM_description.md` | `20260513_1114_context_pipeline_setup.md` |
| Plan | `{feature_name}.md` | `mvp_implementation_order.md` |
| ADR | `ADR-{number}-{short-name}.md` | `ADR-001-fastapi-owns-orchestration.md` |
| Audit | `audit_YYYYMMDD_HHMM_{scope}.md` | `audit_20260513_1200_security.md` |
| Doc | `{feature_name}.md` | `telegram_linking.md` |

---

## Operating Rules

- `plan.md` remains the long-form master plan.
- `critical_prompt.md` captures the durable product north star.
- `context.md` captures current working state, not every detail.
- `architecture/` changes with architecture implementation.
- `docs/` are for completed user-facing or operator-facing features.
- `knowledgebase/` requires citations or local proof.
- `decisions/` records choices that future work should not casually re-litigate.
- `project_refresh_prompt.md` is the reusable maintenance handoff for sweeping project-context updates after significant code changes.
