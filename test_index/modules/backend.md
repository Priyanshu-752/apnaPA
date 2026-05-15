# Backend Test Module

**Status**: Active  
**Last Updated**: 2026-05-14

---

## Test Command

```bash
python -m pytest backend/tests
```

---

## Active Tests

| Test File | Coverage |
| --- | --- |
| `backend/tests/test_app.py` | Health route and major route-group registration |
| `backend/tests/test_auth.py` | Google exchange shape, `/me`, refresh rotation |
| `backend/tests/test_tokens.py` | Access-token round trip and refresh-token hashing or rotation |
| `backend/tests/test_agents.py` | Registry contents and orchestrator routing |
| `backend/tests/test_workflows.py` | n8n-style webhook secret validation |

---

## Current Result

```text
tests 12
pass 12
fail 0
```

---

## Known Gaps

- No persistence-backed database tests yet
- No real Firebase Admin verification tests yet
- No onboarding persistence tests yet
- No Telegram linking or webhook-processing tests yet
- No tests yet for current-session profile, onboarding, or Telegram mutation behavior
- No integration coverage for Qdrant, Redis, or OpenAI yet
