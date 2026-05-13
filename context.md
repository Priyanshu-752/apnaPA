# apnaPA Project Context

**Last Updated**: 2026-05-13  
**Project**: apnaPA AI Personal Manager  
**Status**: Foundation setup  
**Primary Plan**: `plan.md`

---

## Current State

### In Progress

- Agentic coding context pipeline is being installed at the project root.
- Product and architecture planning exist in `plan.md`.
- Dashboard visual direction exists in `dashboard.html`.

### Completed

- Long-form product plan created for apnaPA MVP and future phases.
- Dashboard HTML prototype created as the current visual guide.
- Reference context pipeline reviewed and adapted into an apnaPA-specific structure.

### Next Steps

- Create the backend FastAPI scaffold.
- Add Firebase-backed Google auth handoff.
- Implement users, auth providers, sessions, JWT access tokens, refresh tokens, and auth middleware.
- Implement onboarding persistence and initial AI profile, goal, and reminder setup.
- Create PostgreSQL models and migrations.
- Implement secure Telegram linking and webhook guardrails.
- Implement orchestrator shell, agent registry, health tools, finance tools, daily state engine, memory, reminders, and n8n contracts.
- Build the Next.js dashboard from the approved HTML prototype.

### Blockers

None currently.

---

## Tech Stack

| Area | Planned Technology |
| --- | --- |
| Frontend | Next.js, TypeScript, TailwindCSS, Zustand, TanStack Query, Shadcn UI |
| Backend | FastAPI, Python, Pydantic, Async SQLAlchemy or SQLModel |
| Auth | Firebase Authentication for Google OAuth, FastAPI-owned sessions and JWTs |
| Database | PostgreSQL |
| Vector Memory | Qdrant |
| Cache and Queues | Redis later |
| Workers | Celery or Dramatiq later |
| AI | OpenAI GPT models, speech-to-text, embeddings |
| Automation | n8n |
| External Channel | Telegram Bot |

---

## Key Decisions

1. **FastAPI owns product intelligence**: Firebase only verifies Google identity, and n8n only schedules or delivers workflows.
2. **Dashboard users are canonical**: Telegram accounts must link to authenticated dashboard users before accessing personal data.
3. **One orchestrator entry point**: Sub-agents do not communicate directly with users.
4. **Confirmed AI writes**: AI-generated writes require explicit user confirmation and audit logging.
5. **Context pipeline lives at root**: The reusable reference folder is removed after root docs are created.

See `decisions/` for future ADRs.

---

## Documentation Map

| Document | Purpose |
| --- | --- |
| `critical_prompt.md` | Product north star and MVP principles |
| `plan.md` | Full master plan and implementation sequence |
| `dashboard.html` | Current dashboard visual prototype |
| `architecture/` | Living architecture docs |
| `plans/` | Feature and implementation plans |
| `test_index/` | Test registry and planned coverage |
| `logs/` | Development activity history |
| `context_checkpoints/` | Resumable project snapshots |

---

Update this file after major work steps so new sessions can start without reconstructing context.
