# apnaPA Project Refresh Prompt

Use this file when a major implementation step has changed the codebase enough that project context, structure docs, architecture notes, tests, and logs need a full refresh.

---

## Prompt

```text
Please use `project_refresh_prompt.md` and refresh the project documentation/context based on the current codebase.

Requirements:
1. Read the current implementation first, especially the changed code paths.
2. Update `context.md` with the real current state, completed work, next steps, and blockers.
3. Update `structure.md` if the folder tree or important file layout changed.
4. Update `context_pipeline.md`, `critical_prompt.md`, and `work_prompt.md` if the working model or session workflow changed.
5. Update any affected files in `architecture/`, `docs/`, `plans/`, and `test_index/` so they match the current implementation.
6. Create a session log in `logs/` and a checkpoint in `context_checkpoints/`.
7. Do not wait for me to list individual files unless there is a real ambiguity.
8. End by telling me which docs were updated and what still remains intentionally outdated.
```

---

## When To Use It

- After a major frontend restructure.
- After backend scaffolding or route creation.
- After authentication or protected-route changes.
- After moving folders, files, tests, or architectural boundaries.
- After any session where several documentation areas drift at once.
