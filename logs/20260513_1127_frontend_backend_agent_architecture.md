# 2026-05-13 - Frontend, Backend, and Agent Architecture

**Status**: Complete  
**Source Request**: Create the plan and architecture for frontend, backend, and agents, then update the folders.

---

## Summary

Added focused architecture docs for the backend core, frontend dashboard, and agent system. Added a system data-flow diagram, an implementation plan tying the three areas together, and an ADR locking system ownership boundaries.

---

## Files Created

- `architecture/components/backend-core.md` - FastAPI backend responsibilities, route groups, folder shape, and first slice.
- `architecture/components/frontend-dashboard.md` - Next.js dashboard responsibilities, state ownership, views, API interaction, and first slice.
- `architecture/components/agent-system.md` - orchestrator, sub-agent contract, tools, safety rules, and first slice.
- `architecture/diagrams/system-data-flow.md` - auth, Telegram linking, conversation, and manual write flows.
- `plans/frontend_backend_agent_architecture.md` - build order and acceptance criteria for frontend, backend, and agents.
- `decisions/ADR-001-system-ownership-boundaries.md` - accepted ownership boundaries for FastAPI, frontend, Telegram, Firebase, n8n, and agents.

---

## Files Modified

- `architecture/README.md` - linked new component docs and data flow.
- `architecture/components/README.md` - updated component index.
- `architecture/diagrams/README.md` - updated diagram index.
- `architecture/changelog.md` - recorded architecture expansion.
- `plans/README.md` - added the new architecture plan.
- `decisions/README.md` - indexed ADR-001.
- `context.md` - updated current project state.
- `structure.md` - updated project tree.

---

## Decisions

- Backend implementation should start before frontend implementation because auth, canonical users, and API contracts anchor the rest of the product.
- The agent shell should be implemented before rich domain intelligence so health, finance, memory, reminders, and Dashboard Agent can share one routing and confirmation pattern.

---

## Next Steps

- Start backend scaffold and health route.
- Add auth/session foundation.
- Add agent base contract and registry after auth boundaries are in place.
