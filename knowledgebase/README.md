# apnaPA Knowledgebase

Verified technical findings, local proofs, framework notes, and reusable debugging knowledge live here.

---

## Rules

- Every durable claim needs a source: official docs URL, local command output, code proof, or test result.
- Include the date discovered.
- Mark entries as `[VERIFIED]` or `[NEEDS VERIFICATION]`.
- Link findings to related plans when possible.
- Do not use this folder for opinions, guesses, or product wishes.

---

## Entry Template

~~~markdown
## Topic

**Status**: [VERIFIED]  
**Date**: YYYY-MM-DD  
**Source**: URL or local proof  
**Related Plan**: ../plans/example.md

### Summary

Short finding.

### Details

What was learned and why it matters.

### Proof

```text
Command output, log, test result, or citation.
```
~~~

---

## Initial Topics To Research

- Current FastAPI app structure and testing patterns.
- Firebase Admin SDK token verification in Python.
- Secure refresh token rotation and HTTP-only cookie behavior.
- Telegram webhook validation and bot linking flow.
- Qdrant collection design for user-scoped memory.
- OpenAI structured output, transcription, and embedding usage.
- n8n webhook authentication and retry behavior.
