# apnaPA Work Prompt

Use this file to start, resume, or close AI coding sessions.

---

## Session Start Prompt

```text
I'm working on apnaPA.

Please:
1. Read critical_prompt.md for the product north star.
2. Read context.md for current state.
3. Review the latest context_checkpoints/*.md file if present.
4. Review instructions.md for the documentation workflow.
5. Use plan.md as the full source of truth for architecture, API, database, testing, and implementation order.
6. Tell me what you understand and the next concrete implementation step.
```

---

## Resume Prompt

```text
I'm resuming apnaPA work.

Please read:
- critical_prompt.md
- context.md
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
4. Update structure.md if the project tree changed.
5. List files that should be committed.
```

---

## Feature Completion Prompt

```text
The [FEATURE NAME] feature is complete.

Please:
1. Add or update docs/{feature}.md if the feature is user-facing or operator-facing.
2. Update architecture/ if system structure, data flow, or component boundaries changed.
3. Update test_index/ for new, changed, skipped, or removed tests.
4. Update context.md and create a session log.
5. Create an ADR in decisions/ if a durable architecture decision was made.
```

---

## Quick Reference

| Need | File |
| --- | --- |
| Product vision | `critical_prompt.md` |
| Full plan | `plan.md` |
| Current state | `context.md` |
| Start or end sessions | `work_prompt.md` |
| Architecture | `architecture/` |
| Feature plans | `plans/` |
| Tests | `test_index/` |
| Session history | `logs/` |
| Resume context | `context_checkpoints/` |
