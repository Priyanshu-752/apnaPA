# System Data Flow

**Status**: Partially implemented as scaffold contracts

---

## Dashboard Auth Flow

```text
User
  -> Next.js Login
  -> Firebase Google OAuth
  -> Firebase identity token
  -> FastAPI /api/auth/google
  -> verify provider token
  -> create or resolve user
  -> create session and app tokens
  -> dashboard loads /api/auth/me
```

Current implementation note: the route contract, session creation, token issuance, and `/api/auth/me` path exist. Firebase verification is still dummy and the frontend has not integrated this flow yet.

---

## Telegram Linking Flow

```text
Dashboard user
  -> POST /api/telegram/link-token
  -> FastAPI stores hashed expiring token
  -> Telegram bot /start <token>
  -> POST /api/telegram/webhook
  -> validate token and telegram_id
  -> link telegram_id to canonical user
  -> emit telegram_account_linked
```

Current implementation note: Telegram route scaffolds exist, but real token persistence, webhook processing, and event emission are still placeholder.

---

## Conversation Flow

```text
Telegram or Dashboard Agent
  -> FastAPI conversation endpoint
  -> auth or linked-user context
  -> orchestrator
  -> memory retrieval
  -> intent detection
  -> domain agent and tools
  -> confirmation if write is proposed
  -> service write after confirmation
  -> event emitted
  -> response returned to channel
```

Current implementation note: `/api/agent/chat`, orchestrator intent routing, and domain-agent stubs exist. Real tool execution, persistence, and confirmation-save flows do not yet exist.

---

## Manual Dashboard Write Flow

```text
Dashboard form
  -> FastAPI protected route
  -> Pydantic validation
  -> domain service
  -> PostgreSQL write
  -> event emitted
  -> TanStack Query invalidation
  -> dashboard refresh
```

Current implementation note: this remains a target flow. The frontend still uses local state and does not call FastAPI yet.
