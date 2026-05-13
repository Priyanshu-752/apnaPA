# MVP Implementation Order

**Status**: Ready  
**Priority**: High  
**Source**: `../plan.md`

---

## Summary

Build apnaPA from core backend foundations toward secure communication channels, agent orchestration, memory, reminders, and the Next.js dashboard. Keep the MVP reliable and simple before adding advanced autonomy.

---

## Order

1. Finalize dashboard UI direction using `dashboard.html`.
2. Create backend FastAPI project structure.
3. Implement Firebase token validation plus FastAPI users, auth providers, sessions, access tokens, refresh tokens, and auth middleware.
4. Implement onboarding persistence and initial AI profile, goal, and reminder setup.
5. Create database models and migrations.
6. Implement secure Telegram linking, unlinking, reconnect, and Telegram webhook guardrails.
7. Implement Telegram text webhook.
8. Implement orchestrator shell and agent registry.
9. Implement health and finance logging tools.
10. Implement daily state engine.
11. Implement date-range health and finance summaries with daily detail endpoints.
12. Implement goal creation, update, and AI suggestion workflows.
13. Implement memory storage with Qdrant and basic hybrid retrieval.
14. Implement reminder service and n8n workflow contracts.
15. Add basic AI action logs, usage logs, structured logging, and health checks.
16. Build Next.js dashboard using the approved HTML prototype as the visual guide.

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

Start with the backend scaffold and auth foundation:

- `backend/app/config/settings.py`
- `backend/app/database/session.py`
- `backend/app/auth/firebase.py`
- `backend/app/auth/tokens.py`
- `backend/app/auth/sessions.py`
- `backend/app/api/dependencies.py`
- `backend/app/api/routes/auth.py`
- `backend/main.py`

Acceptance for the first slice: the backend starts, exposes a health route, verifies the shape of auth routes, and has testable token/session helpers.
