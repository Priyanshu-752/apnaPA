# MVP Implementation Order

**Status**: In Progress  
**Priority**: High  
**Source**: `../plan.md`

---

## Summary

Build apnaPA from the current frontend-backend auth/session bridge toward real persistence, secure linked channels, agent orchestration, memory, reminders, and full dashboard integration. Keep the MVP reliable and simple before adding advanced autonomy.

---

## Completed Foundation

1. Finalized dashboard UI direction using `dashboard.html`.
2. Built the Next.js dashboard scaffold with protected route groups and local dummy state.
3. Created the backend FastAPI project structure.
4. Implemented scaffold-level auth/session helpers and protected auth routes.
5. Implemented the orchestrator shell, agent registry, domain-agent stubs, and workflow secret contracts.
6. Added Google Identity Services login UI, Next.js route-handler auth exchange, cookie-backed session handling, backend bootstrap loading, backend agent chat, and a first set of backend-backed dashboard writes.
7. Added in-memory backend mutation for profile, onboarding-complete, and Telegram-link placeholder state.

---

## Remaining Order

1. Implement real Google token verification plus persistence-backed FastAPI users, auth providers, sessions, access tokens, refresh tokens, and auth middleware.
2. Create database models, migrations, and real async session management.
3. Implement onboarding persistence and initial AI profile, goal, and reminder setup.
4. Implement secure Telegram linking, unlinking, reconnect, and Telegram webhook guardrails.
5. Implement Telegram text webhook and later voice-note handling.
6. Implement health and finance logging tools and service writes.
7. Implement the daily state engine.
8. Implement date-range health and finance summaries with daily detail endpoints.
9. Implement goal creation, update, and AI suggestion workflows.
10. Implement memory storage with Qdrant and basic hybrid retrieval.
11. Implement reminder service and n8n workflow execution behind the current contracts.
12. Add AI action logs, usage logs, structured logging, and richer health checks.
13. Replace more frontend dummy reads with FastAPI-backed dashboard modules.
14. Add end-to-end integration tests across auth, onboarding, Telegram, agent, and dashboard flows.

---

## MVP Acceptance Criteria

- Google sign-in creates FastAPI-owned app sessions.
- Onboarding can resume, complete, and initialize profile, goals, reminders, memory context, and dashboard state.
- Telegram can be securely linked to a dashboard user.
- Telegram text can create confirmed meal and expense logs.
- Telegram voice notes can be transcribed and handled by the orchestrator.
- Dashboard shows health, finance, reminders, goals, activity, and AI insights.
- Dashboard Agent uses the same backend orchestrator as Telegram.
- Health and finance summaries support today, last 7 days, this month, and custom date ranges.
- Goal creation and updates work manually and conversationally with confirmation.
- Relevant memories are retrieved before AI responses.
- n8n can trigger reminders without owning business logic.
- User data is isolated by user id.
- AI writes require confirmation and create audit logs.
- Core AI usage, errors, and jobs are observable internally.

---

## First Slice Recommendation

The original scaffold slice is complete, and the new auth/session bridge slice is also complete. The next slice should focus on replacing the placeholders behind that bridge:

- `backend/app/auth/firebase.py`
- `backend/app/database/`
- `backend/app/api/routes/auth.py`
- `backend/app/api/routes/onboarding.py`
- `backend/app/api/routes/telegram.py`
- `backend/app/auth/sessions.py`
- backend persistence models and migrations
- frontend server-backed read modules after contract stabilization

Acceptance for the next slice: the backend still starts, current tests still pass, browser Google sign-in validates against a real server-side verifier, and onboarding or Telegram state can be persisted instead of staying in memory.
