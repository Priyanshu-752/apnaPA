# apnaPA Documentation Instructions

These instructions define how to maintain context, plans, architecture, tests, and handoffs while building apnaPA.

---

## Core Files

### `critical_prompt.md`

Project north star. Update only when the product vision, principles, or MVP boundaries change.

### `plan.md`

Full master plan. Use this as the detailed source for product requirements, architecture, database schema, API surface, testing, and implementation order.

### `context.md`

Current working state. Update after major work steps with completed work, in-progress items, next steps, blockers, and key decisions.

### `work_prompt.md`

Session start and end prompt templates for future AI coding sessions.

### `structure.md`

Project tree and quick navigation. Update when top-level folders or major structure changes.

---

## Folder Rules

| Folder | Purpose | Update When |
| --- | --- | --- |
| `context_checkpoints/` | Timestamped session snapshots | End of session or milestone |
| `architecture/` | Living system architecture | Architecture or component boundaries change |
| `plans/` | Feature specs and implementation roadmaps | Planning or scope changes |
| `knowledgebase/` | Verified technical findings | Research or debugging produces reusable truth |
| `decisions/` | Architectural Decision Records | A meaningful technical choice is made |
| `errors/` | Error logs and solutions | Debugging was non-trivial or likely to recur |
| `audits/` | Review and audit reports | Security, quality, architecture, or doc audits |
| `logs/` | Development activity records | After each meaningful work session |
| `test_index/` | Registry of tests and coverage intent | Tests are added, changed, skipped, or removed |
| `docs/` | User and operator documentation | A feature becomes complete and stable |

---

## Starting Work

1. Read `critical_prompt.md`.
2. Read `context.md`.
3. Read the latest checkpoint if resuming after a break.
4. Read the relevant plan file in `plans/`.
5. Use `plan.md` for deeper details.

---

## Planning Work

1. Define success criteria and acceptance tests.
2. Verify unstable technical facts with official docs.
3. Save reusable findings in `knowledgebase/`.
4. Create or update a focused plan in `plans/`.
5. Create an ADR if the decision affects future architecture.

---

## During Implementation

- Keep changes scoped to the active plan.
- Preserve `plan.md` and `dashboard.html` unless the user explicitly asks to change them.
- Update architecture docs alongside architectural changes.
- Update `test_index/` when adding or changing tests.
- Log debugging learnings in `errors/` when the fix was non-obvious.

---

## Ending Work

1. Create a log in `logs/YYYYMMDD_HHMM_description.md`.
2. Create a checkpoint in `context_checkpoints/context_checkpoint_DD-MM-YYYY-H-MMPM.md`.
3. Update `context.md`.
4. Update `structure.md` if the project structure changed.
5. Note useful next steps for the next session.

---

## Quality Bar

- Prefer concise docs that future sessions will actually read.
- Cite current official docs or include local proof for knowledgebase claims.
- Keep decisions clear enough that a future engineer understands the tradeoff.
- Keep tests mapped to user-visible behavior and important backend contracts.
