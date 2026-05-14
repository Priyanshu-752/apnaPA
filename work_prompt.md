# apnaPA Work Prompt

Use this file to start, resume, or close AI coding sessions.

---

## Session Start Prompt

```text
I'm working on apnaPA.

Please:
1. Read critical_prompt.md for the product north star.
2. Read context.md for whole-app current state.
3. Read context_backend.md or context_frontend.md for the implementation surface being touched.
4. Review the latest context_checkpoints/*.md file if present.
5. Review instructions.md for the documentation workflow.
6. Use plan.md as the full source of truth for architecture, API, database, testing, and implementation order.
7. Tell me what you understand and the next concrete implementation step.
```

---

## Resume Prompt

```text
I'm resuming apnaPA work.

Please read:
- critical_prompt.md
- context.md
- context_backend.md or context_frontend.md depending on the task
- the latest context_checkpoints/*.md
- the relevant file in plans/

Then continue from the latest checkpoint without restarting from scratch.
```

---

## Session End Prompt

```text
We're wrapping up this apnaPA session.

Please:
1. Create a log at logs/YYYYMMDD_HHMM_description.md with summary, files changed, decisions, issues, and next steps.
2. Create a checkpoint at context_checkpoints/context_checkpoint_DD-MM-YYYY-H-MMPM.md.
3. Update context.md with completed work, active work, next steps, and blockers.
4. Update context_backend.md and or context_frontend.md if that surface changed.
5. Update structure.md if the project tree changed.
6. List files that should be committed.
```

---

## Feature Completion Prompt

```text
The [FEATURE NAME] feature is complete.

Please:
1. Add or update docs/{feature}.md if the feature is user-facing or operator-facing.
2. Update architecture/ if system structure, data flow, or component boundaries changed.
3. Update test_index/ for new, changed, skipped, or removed tests.
4. Update context.md and the relevant split context file, then create a session log.
5. Create an ADR in decisions/ if a durable architecture decision was made.
```

---

## Project Refresh Prompt

```text
Use project_refresh_prompt.md and update the project context after the latest major implementation work.
```

---

## Quick Reference

| Need | File |
| --- | --- |
| Product vision | `critical_prompt.md` |
| Full plan | `plan.md` |
| Whole-app state | `context.md` |
| Backend state | `context_backend.md` |
| Frontend state | `context_frontend.md` |
| Start or end sessions | `work_prompt.md` |
| Full project-context refresh | `project_refresh_prompt.md` |
| Architecture | `architecture/` |
| Feature plans | `plans/` |
| Tests | `test_index/` |
| Session history | `logs/` |
| Resume context | `context_checkpoints/` |
