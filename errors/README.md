# apnaPA Error Log

Record non-trivial errors, debugging sessions, and fixes that may save time later.

---

## When To Log

- Debugging took more than about 30 minutes.
- The solution was non-obvious.
- The issue may recur in local setup, CI, deployment, auth, Telegram, AI calls, database, Qdrant, n8n, or workers.

---

## Entry Template

~~~markdown
## Error Title

**Date**: YYYY-MM-DD  
**Severity**: Critical | High | Medium | Low  
**Status**: Resolved | Workaround | Open  
**Related**: Feature, file, or component

### Symptoms

What happened?

### Root Cause

What was wrong?

### Solution

What fixed it?

### Prevention

How should future work avoid it?

### Logs

```text
Relevant command output or traceback.
```
~~~

---

## Index

| Error | Severity | Status | Date |
| --- | --- | --- | --- |
| _No entries yet_ | | | |
