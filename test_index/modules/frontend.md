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
| `frontend/tests/dummy-data.test.ts` | Navigation modules, dummy domain data, manual entry specs |
| `frontend/tests/agent.test.ts` | Intent classification, confirmation drafts, dummy Agent replies |
| `frontend/tests/next-contract.test.ts` | Route structure, middleware guards, protected flow shape, no API integration |

---

## Current Result

```text
tests 14
pass 14
fail 0
```

---

## Known Gaps

- No browser rendering test yet.
- No accessibility audit yet.
- No responsive screenshot test yet.
- No browser-level route navigation test yet.
