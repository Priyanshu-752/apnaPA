# apnaPA Test Index

**Last Updated**: 2026-05-13  
**Status**: Planned  
**Total Test Files**: 0  
**Total Test Cases**: 0

---

## Quick Stats

| Metric | Value |
| --- | --- |
| Total Test Files | 0 |
| Total Test Cases | 0 |
| Passing | 0 |
| Failing | 0 |
| Skipped | 0 |
| Flaky | 0 |

---

## Planned Backend Tests

| Area | Coverage Intent | Status |
| --- | --- | --- |
| Auth | Firebase token validation adapter, session creation, refresh token rotation, logout | Planned |
| Onboarding | Step persistence, completion, default goal/reminder initialization | Planned |
| Telegram Linking | Token creation, expiry, duplicate protection, unlink, reconnect | Planned |
| Telegram Webhook | Webhook guardrails, linked-user resolution, text message handling | Planned |
| Health | Meal parsing, nutrition calculation, log persistence, daily state updates | Planned |
| Finance | Expense parsing, categorization, log persistence, summaries | Planned |
| Daily State | Aggregation from health, finance, goals, and reminders | Planned |
| Goals | Suggestions, validation, confirmation handling, create/update flows | Planned |
| Memory | Save, retrieve, summarize, user isolation, vector lookup interfaces | Planned |
| Agent Chat | Intent routing, structured outputs, confirmation requirements, fallback behavior | Planned |
| Events | Expected events emitted after successful state changes | Planned |
| Workers | Idempotency, retries, dead-letter handling later | Planned |

---

## Planned Frontend Tests

| Area | Coverage Intent | Status |
| --- | --- | --- |
| Auth | Google login handoff, protected routes, logout | Planned |
| Onboarding | Resume, validation, completion flow | Planned |
| Dashboard | Overview, health, finance, reminders, goals, activity rendering | Planned |
| Dashboard Agent | Open, send, response, confirmation flow, close | Planned |
| Forms | Meal, expense, reminder, settings, and goal validation | Planned |
| Date Filters | Today, last 7 days, this month, custom ranges | Planned |
| Daily Details | Health and finance row drilldowns | Planned |
| UI States | Loading, empty, error, skeleton states | Planned |
| Responsive Layout | Core dashboard views across mobile and desktop | Planned |

---

## Planned Integration Tests

| Flow | Coverage Intent | Status |
| --- | --- | --- |
| Google Auth | Firebase token to FastAPI session creation | Planned |
| Onboarding | Completion to initialized profile, goals, reminders, memory, dashboard state | Planned |
| Telegram Linking | Dashboard token to Telegram `/start <token>` to linked account | Planned |
| Meal Logging | Telegram message to confirmed health log and dashboard visibility | Planned |
| Voice Note | Telegram voice note to transcription to agent response | Planned |
| Expense Logging | Conversation to categorized finance log | Planned |
| Dashboard Agent | Dashboard message to orchestrator response | Planned |
| Summaries | Health and finance range summaries and daily detail retrieval | Planned |
| Goals | Manual and chat-created goals after confirmation | Planned |
| Reminders | n8n trigger to FastAPI to Telegram notification | Planned |
| Daily Summary | Generation and storage | Planned |

---

## Active Test Files

| Test File | Module | Status | Notes |
| --- | --- | --- | --- |
| _No tests yet_ | | | |

---

Update this index whenever tests are added, removed, skipped, or significantly changed.
