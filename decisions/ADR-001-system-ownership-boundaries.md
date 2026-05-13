# ADR-001: System Ownership Boundaries

**Date**: 2026-05-13  
**Status**: Accepted  
**Deciders**: apnaPA project owner and Codex

## Context

apnaPA has multiple surfaces and services: Next.js dashboard, Telegram bot, FastAPI backend, Firebase Authentication, n8n, OpenAI APIs, PostgreSQL, and Qdrant. Without explicit boundaries, business logic could drift into the frontend, Telegram workflows, or n8n automations.

## Options Considered

- Put business logic in each channel: faster initial UI work, but duplicated behavior and inconsistent safety rules.
- Let n8n own workflow decisions: convenient scheduling, but poor ownership for AI reasoning and domain state.
- Make FastAPI the central owner: clearer boundaries, shared behavior, stronger auth and audit model.

## Decision

FastAPI owns canonical users, sessions, onboarding, Telegram linking, business logic, memory, event generation, AI orchestration, agent coordination, and write confirmation rules.

The frontend owns user interface state and presentation. Telegram is a linked channel. Firebase validates Google identity only. n8n handles scheduling, retries, and delivery, but not AI reasoning or domain decisions.

## Consequences

- Telegram and Dashboard Agent share the same orchestrator behavior.
- User data access is consistently scoped through FastAPI auth and linked-channel checks.
- AI writes can be validated, confirmed, audited, and emitted as events in one place.
- Frontend and n8n integrations stay simpler because they call backend contracts instead of owning business workflows.
- Backend implementation must be solid early because most product behavior depends on it.

## References

- `../plan.md`
- `../architecture/components/backend-core.md`
- `../architecture/components/frontend-dashboard.md`
- `../architecture/components/agent-system.md`
