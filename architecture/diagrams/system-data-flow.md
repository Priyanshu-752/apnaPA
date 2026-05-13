# System Data Flow

**Status**: Planned

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
