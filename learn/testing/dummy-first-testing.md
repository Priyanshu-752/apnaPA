# Dummy-First Testing Strategy

The project will be built with dummy data first, then real integration later.

---

## Why Dummy First

If frontend, backend, and agent behavior are connected too early, every bug becomes hard to locate.

Dummy-first lets us test:

- UI layout and user flows.
- agent confirmation behavior.
- backend route contracts.
- service boundaries.
- data shapes.

Then we integrate APIs after the contracts are stable.

---

## Current Frontend Tests

Implemented in `frontend/tests/`:

- dummy dashboard data covers MVP domains.
- navigation modules exist.
- meal and expense manual entry specs exist.
- agent mock classifies intents.
- write-like agent intents require confirmation.
- HTML includes required app roots and dialogs.
- HTML does not call APIs yet.

Run:

```bash
npm.cmd test --prefix frontend
```

---

## Future Backend Tests

Planned backend tests:

- health route returns app status.
- settings load default and environment values.
- route groups register correctly.
- auth token helper creates and validates dummy tokens.
- refresh tokens are hashed.
- protected dependency rejects missing token.
- onboarding service saves and completes dummy profile.
- Telegram link token expires and can be used only once.

---

## Future Agent Tests

Planned agent tests:

- registry resolves supported intents.
- orchestrator routes health and finance messages.
- write proposals require confirmation.
- low-confidence messages ask clarification.
- memory retrieval is scoped by user id.
- tool failures return fallback responses.

---

## Future Integration Tests

Only after dummy contracts pass:

- frontend auth UI to FastAPI auth exchange.
- dashboard overview to backend dummy endpoint.
- Dashboard Agent to `/api/agent/chat`.
- Telegram webhook to orchestrator.
- n8n reminder trigger to FastAPI webhook.
- memory retrieval through Qdrant test collection.
