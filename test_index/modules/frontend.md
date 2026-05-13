# Frontend Test Module

**Status**: Active  
**Last Updated**: 2026-05-13

---

## Test Command

```bash
npm.cmd test --prefix frontend
```

---

## Active Tests

| Test File | Coverage |
| --- | --- |
| `frontend/tests/dummy-data.test.mjs` | Navigation modules, dummy domain data, manual entry specs |
| `frontend/tests/agent.test.mjs` | Intent classification, confirmation drafts, dummy Agent replies |
| `frontend/tests/html-contract.test.mjs` | Required DOM roots/dialogs, module script, no API integration |

---

## Current Result

```text
tests 11
pass 11
fail 0
```

---

## Known Gaps

- No browser rendering test yet.
- No accessibility audit yet.
- No responsive screenshot test yet.
- No Next.js component test yet because the current implementation is a dependency-light static mock.
