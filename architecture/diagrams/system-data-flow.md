# System Data Flow

**Status**: Partially implemented with a live browser-to-Next-to-FastAPI auth bridge

---

## Dashboard Auth Flow

```text
User
  -> Next.js Login
  -> Google Identity Services
  -> browser credential
  -> Next.js POST /api/auth/google
  -> FastAPI /api/auth/google
  -> dummy verify provider token
  -> create in-memory session and app tokens
  -> Next.js stores httpOnly cookies
  -> dashboard loads /api/app/bootstrap
  -> bootstrap calls FastAPI /api/auth/me and dashboard routes
```

Current implementation note: the frontend and Next.js route-handler bridge are live. The remaining placeholder is server-side verification and persistence, not the existence of the flow itself.

---

## Telegram Linking Flow

```text
Dashboard user
  -> Next.js GET /api/telegram/link
  -> FastAPI /api/telegram/link-token
  -> return placeholder link token
  -> user confirms link in dashboard
  -> Next.js POST /api/telegram/link
  -> FastAPI /api/telegram/link/confirm
  -> mark telegram_linked in current session
```

Current implementation note: token generation and confirm acknowledgement now round-trip through the frontend and backend, but real token persistence, Telegram `/start` handling, and webhook-driven linking are still placeholder.

---

## Conversation Flow

```text
Dashboard Agent
  -> Next.js POST /api/agent/chat
  -> FastAPI /api/agent/chat
  -> orchestrator
  -> memory retrieval stub
  -> intent detection
  -> domain agent or orchestrator fallback
  -> confirmation-oriented reply
  -> response returned to dashboard
```

Current implementation note: `/api/agent/chat`, orchestrator intent routing, and frontend agent chat are live. Real tool execution, persistence, and confirmation-save flows do not yet exist.

---

## Manual Dashboard Write Flow

```text
Dashboard form
  -> Next.js protected route handler
  -> FastAPI protected route
  -> Pydantic validation
  -> placeholder domain response or current-session mutation
  -> success or error message returned
  -> toast shows backend message
```

Current implementation note: this flow now exists for profile save, onboarding complete, Telegram connect, health logs, finance logs, and goals. Real database writes and downstream event emission are still target-state work.
