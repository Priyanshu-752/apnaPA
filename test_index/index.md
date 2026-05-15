# apnaPA Test Index

**Last Updated**: 2026-05-14  
**Status**: Active  
**Total Test Files**: 8  
**Total Test Cases**: 26

---

## Quick Stats

| Metric | Value |
| --- | --- |
| Total Test Files | 8 |
| Total Test Cases | 26 |
| Passing | 26 |
| Failing | 0 |
| Skipped | 0 |
| Flaky | 0 |

---

## Active Backend Tests

| Test File | What It Tests | Status |
| --- | --- | --- |
| `backend/tests/test_app.py` | App boot health route and major route-group registration | Passing |
| `backend/tests/test_auth.py` | Google exchange shape, protected `/me`, refresh rotation | Passing |
| `backend/tests/test_tokens.py` | Access-token round trip and refresh-token rotation behavior | Passing |
| `backend/tests/test_agents.py` | Registry contents and orchestrator routing for meal and expense messages | Passing |
| `backend/tests/test_workflows.py` | Workflow shared-secret rejection and acceptance | Passing |

Run:

```bash
python -m pytest backend/tests
```

---

## Active Frontend Tests

| Test File | What It Tests | Status |
| --- | --- | --- |
| `frontend/tests/dummy-data.test.ts` | Navigation, dummy domain coverage, manual entry specs, Zod validation | Passing |
| `frontend/tests/agent.test.ts` | Intent classification, confirmation drafts, dummy replies | Passing |
| `frontend/tests/next-contract.test.ts` | Route groups, middleware guards, required screen sections, and session-backed auth/bootstrap route presence | Passing |

Run:

```bash
npm.cmd test --prefix frontend
npm.cmd run build --prefix frontend
```

---

## Planned Backend Expansion Tests

| Area | Coverage Intent | Status |
| --- | --- | --- |
| Auth | Real Firebase Admin verification and persistence-backed sessions | Planned |
| Onboarding | Step persistence, completion, and default state initialization | Planned |
| Telegram Linking | Token creation, expiry, duplicate protection, unlink, reconnect | Planned |
| Telegram Webhook | Linked-user resolution and message handling | Planned |
| Health | Meal parsing, nutrition calculation, log persistence, daily state updates | Planned |
| Finance | Expense parsing, categorization, log persistence, summaries | Planned |
| Goals and Reminders | Validation, create or update flows, completion and snooze behavior | Planned |
| Memory | Save, retrieve, summarize, user isolation, vector lookup interfaces | Planned |
| Events and Workers | Expected event emission, retries, and idempotency later | Planned |

---

## Planned Frontend Expansion Tests

| Area | Coverage Intent | Status |
| --- | --- | --- |
| Auth | Browser Google handoff, route-handler exchange, logout, and refresh behavior | Planned |
| Onboarding | Resume, validation, and completion flow | Planned |
| Dashboard | Server-backed overview, health, finance, reminders, and settings rendering | Planned |
| Forms | Meal, expense, reminder, settings, and goal submission behavior | Planned |
| UI States | Loading, empty, error, and skeleton states | Planned |
| Responsive Layout | Core dashboard views across mobile and desktop | Planned |
| Accessibility | Keyboard flow and key semantic checks | Planned |

---

## Planned Integration Tests

| Flow | Coverage Intent | Status |
| --- | --- | --- |
| Google Auth | Browser credential to Next route handler to FastAPI session creation | Planned |
| Onboarding | Completion to initialized profile, goals, reminders, memory, dashboard state | Planned |
| Telegram Linking | Dashboard token to Telegram `/start <token>` to linked account | Planned |
| Meal Logging | Dashboard form or conversation to confirmed health log and dashboard visibility | Planned |
| Expense Logging | Dashboard form or conversation to categorized finance log and dashboard visibility | Planned |
| Dashboard Agent | Dashboard message to orchestrator response | Planned |
| Reminders | n8n trigger to FastAPI to delivery flow | Planned |
| Summaries | Health and finance range summaries and daily detail retrieval | Planned |

---

## Module Notes

- `test_index/modules/backend.md`
- `test_index/modules/frontend.md`

---

Update this index whenever tests are added, removed, skipped, or significantly changed.
