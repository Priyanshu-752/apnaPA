# apnaPA AI Personal Manager System Plan

## 1. Product Summary

apnaPA is an AI-powered personal operating system and conversational life assistant that helps users manage health, finance, routines, reminders, and long-term goals through proactive memory-aware conversations.

The system should feel conversational first, proactive, personal, memory-aware, and assistant-oriented. It should not feel like a generic chatbot dashboard. The architecture now evolves from a personal-only assistant into a multi-user production-ready AI platform while preserving the current FastAPI orchestration, agent structure, dashboard modules, event-driven design, and RAG memory foundation.

The first production communication channel is Telegram. The first visual control surface is a web dashboard with an in-app Agent chat dialog. FastAPI owns user identity, product state, AI orchestration, business logic, memory handling, event generation, goal workflows, and agent coordination. Firebase Authentication is used only for Google OAuth. Telegram linking handles bot access, reminders, notifications, and conversational sync. n8n handles scheduling, workflow retries, and notification delivery, but does not own AI reasoning or domain decisions.

Communication surfaces:

- Telegram remains the primary external conversation channel.
- Dashboard Agent is the in-app conversation channel for asking questions, reviewing summaries, setting goals, and updating structured data.
- Both surfaces use the same FastAPI orchestrator, memory retrieval, tools, and confirmation rules.
- Authenticated dashboard users are the canonical users. Telegram accounts must be securely linked to authenticated users before Telegram can access personal data.

## 2. MVP Goals

The MVP should prove that a user can talk to the system every day and receive useful, structured, proactive assistance.

Core MVP capabilities:

- Multi-user authentication with Google Login.
- Backend-owned sessions, JWT access tokens, refresh tokens, and onboarding state.
- Secure Telegram account linking to authenticated dashboard users.
- Structured onboarding that initializes profile, goals, reminders, memory context, and dashboard state.
- Telegram text conversations.
- Telegram voice note transcription.
- Meal logging with calories and protein tracking.
- Expense logging with category and savings tracking.
- Configurable reminders.
- Daily summary generation.
- Conversational memory and preference storage.
- Web dashboard analytics for health, finance, reminders, date-range history, goals, and recent activity.
- In-dashboard Agent chat for the same user tasks supported through Telegram.
- Event-driven backend foundation for future agents.

MVP priority order:

1. Reliable conversational logging.
2. Memory retrieval.
3. Reminder workflows.
4. Daily summaries.
5. Dashboard visibility.
6. Stable auth and onboarding.
7. Telegram integration.

The MVP should stay simple, reliable, and extensible. Avoid autonomous planning, excessive agent complexity, too many workflows, and overbuilt RAG pipelines in the first release.

Out of scope for the first MVP:

- Mobile app.
- Image-based food recognition.
- Full autonomous planning.
- Multi-user family or team spaces.
- Advanced investment advice.
- Complex medical recommendations.
- Subscriptions, team workspaces, and enterprise administration.

## 3. Target Architecture

```txt
Google OAuth
   |
   v
Firebase Authentication
   |
   | verified provider token
   v
FastAPI Auth + Core Backend <------------------- Next.js Dashboard
   |                                                |
   |                                                +-- Dashboard Agent
   |
   +-- Orchestrator Agent
   +-- Health Agent
   +-- Finance Agent
   +-- Memory Service
   +-- Reminder Service
   +-- Onboarding Service
   +-- Event Bus
   +-- Background Workers
   |
   +-- OpenAI APIs
   +-- PostgreSQL
   +-- Qdrant Vector Memory
   +-- Redis Queue / Cache
   |
   v
n8n Automation Layer
   |
   v
Telegram Bot / Email / Future Channels
```

Main rules:

- FastAPI is the central AI brain.
- Telegram and the dashboard use the same backend APIs.
- Firebase Authentication verifies identity providers only; FastAPI remains the source of truth for users, sessions, permissions, onboarding, Telegram linking, and AI profile creation.
- Dashboard users are canonical; Telegram users must map to authenticated dashboard users.
- n8n handles scheduling and delivery, not business logic.
- Agents use structured tools and typed outputs.
- User memory is centralized and isolated by user.
- Every important action emits an event.
- Future agents are registered through a shared agent interface.
- The orchestrator is the only entry point for agent coordination.
- Sub-agents never communicate directly with users independently.

## 4. Technology Stack

Frontend:

- Next.js
- TypeScript
- TailwindCSS
- Zustand
- TanStack Query
- Shadcn UI

Backend:

- FastAPI
- Python
- Async SQLAlchemy or SQLModel
- Pydantic schemas
- REST APIs
- WebSocket support for dashboard live updates
- Firebase Admin SDK for validating Google OAuth identity tokens.
- Secure JWT access token and refresh token issuing from FastAPI.
- Redis later for queues, cache, rate limiting, and short-lived auth/linking state.
- Celery or Dramatiq later for background job workers.

AI:

- OpenAI GPT models for reasoning and response generation.
- OpenAI Whisper or speech-to-text API for voice notes.
- OpenAI embeddings for semantic memory.

Data:

- PostgreSQL for structured application data.
- Qdrant for vector memory.
- Optional Redis later for queues, rate limits, and short-lived state.

Automation:

- n8n for cron jobs, retries, Telegram delivery workflows, and weekly report scheduling.

Authentication:

- Firebase Authentication for Google OAuth only.
- FastAPI for user creation, sessions, refresh token rotation, onboarding state, permissions, and Telegram linking.

## 5. Backend Folder Structure

```txt
backend/
  app/
    api/
      routes/
      dependencies.py
    auth/
      firebase.py
      tokens.py
      sessions.py
      middleware.py
    agents/
      base.py
      registry.py
      orchestrator/
      health/
      finance/
      memory/
    tools/
      health_tools.py
      finance_tools.py
      reminder_tools.py
    workflows/
      n8n_client.py
    services/
      telegram_service.py
      transcription_service.py
      onboarding_service.py
      reminder_service.py
      analytics_service.py
      daily_state_service.py
      notification_service.py
    database/
      session.py
      migrations/
    models/
    schemas/
    vector_memory/
      qdrant_client.py
      retriever.py
      summarizer.py
    events/
      bus.py
      handlers.py
      types.py
    queues/
      workers.py
      jobs.py
      retry.py
    prompts/
      versions/
    utils/
    observability/
      logging.py
      metrics.py
      tracing.py
    config/
      settings.py
  main.py
  requirements.txt
```

## 6. Frontend Folder Structure

```txt
frontend/
  app/
  components/
  modules/
    auth/
    onboarding/
    dashboard/
    health/
    finance/
    reminders/
    memory/
    settings/
  stores/
    auth-store.ts
    conversation-store.ts
    notification-store.ts
    dashboard-store.ts
  services/
  hooks/
  lib/
  types/
  utils/
```

## 7. Agent Design

### Orchestrator Agent

Responsibilities:

- Detect user intent.
- Retrieve relevant memory.
- Select the correct sub-agent.
- Assemble conversation context.
- Call structured tools.
- Update daily state.
- Emit domain events.
- Decide whether a proactive reminder or workflow should be triggered.
- Enforce token budgets, confirmation requirements, safety checks, and tool permissions.
- Route all sub-agent work through a shared execution context.

Expected intents:

- `log_meal`
- `log_expense`
- `ask_health_summary`
- `ask_finance_summary`
- `set_goal`
- `set_reminder`
- `update_preferences`
- `general_conversation`
- `unknown_or_needs_clarification`

### Shared Agent Contract

All agents should implement a common interface:

- `name`
- `supported_intents`
- `input_schema`
- `output_schema`
- `available_tools`
- `execute(context, payload)`
- `fallback(context, error)`

Agent execution context should include:

- authenticated `user_id`
- active conversation/session id
- source channel: dashboard, Telegram, n8n, or worker
- retrieved memories
- daily state
- permissions and safety policy
- token budget
- trace id

Agent rules:

- The orchestrator is the only entry point for agent coordination.
- Sub-agents never send user-facing messages directly.
- Tool calls use typed schemas and validated structured outputs.
- Agent calls must have timeouts and fallback handling.
- The registry owns agent lifecycle, versioning, enablement, and future plugin registration.
- Future agents should be added through the registry without rewriting orchestration.

### Health Agent

Responsibilities:

- Parse meal logs from text or voice.
- Calculate approximate calories, protein, carbs, and fats.
- Track hydration, streaks, and daily progress.
- Compare logged data against goals.
- Generate daily health summaries.
- Recommend next actions when appropriate.

Tools:

- `parse_meal_input(raw_text)`
- `calculate_nutrition(food_items)`
- `save_health_log(user_id, nutrition_log)`
- `get_daily_health_state(user_id, date)`
- `update_health_goal(user_id, goal_payload)`

### Finance Agent

Responsibilities:

- Parse expenses and income from conversation.
- Categorize transactions.
- Track budgets and savings progress.
- Generate daily and monthly finance summaries.
- Detect overspending patterns.

Tools:

- `parse_finance_input(raw_text)`
- `categorize_transaction(transaction)`
- `save_finance_log(user_id, finance_log)`
- `get_finance_state(user_id, date_range)`
- `update_budget_or_goal(user_id, goal_payload)`

### Memory Service

Responsibilities:

- Store important conversation memories.
- Retrieve relevant user history for each interaction.
- Summarize long conversations.
- Store preferences, routines, goals, and recurring patterns.
- Keep user memory isolated.

Memory types:

- `preference`
- `goal`
- `routine`
- `health_pattern`
- `finance_pattern`
- `conversation_summary`
- `important_fact`

## 8. Database Plan

### users

```sql
id uuid primary key
telegram_id text unique
name text
timezone text
reminder_preferences jsonb
sleep_time time
wake_time time
onboarding_completed boolean default false
ai_profile jsonb
deleted_at timestamptz
created_at timestamptz
updated_at timestamptz
```

### auth_providers

```sql
id uuid primary key
user_id uuid references users(id)
provider text
provider_user_id text
email text
verified boolean
metadata jsonb
created_at timestamptz
updated_at timestamptz
unique(provider, provider_user_id)
```

### sessions

```sql
id uuid primary key
user_id uuid references users(id)
refresh_token_hash text
device_info jsonb
ip_address inet
user_agent text
expires_at timestamptz
revoked_at timestamptz
created_at timestamptz
updated_at timestamptz
```

### onboarding_progress

```sql
id uuid primary key
user_id uuid references users(id)
current_step text
completed_steps jsonb
profile_payload jsonb
recommendations jsonb
completed_at timestamptz
created_at timestamptz
updated_at timestamptz
unique(user_id)
```

### telegram_link_tokens

```sql
id uuid primary key
user_id uuid references users(id)
token_hash text unique
expires_at timestamptz
used_at timestamptz
revoked_at timestamptz
created_at timestamptz
```

### health_logs

```sql
id uuid primary key
user_id uuid references users(id)
meal_name text
food_items jsonb
calories numeric
protein numeric
carbs numeric
fats numeric
meal_time timestamptz
raw_input text
source text
created_at timestamptz
```

### finance_logs

```sql
id uuid primary key
user_id uuid references users(id)
category text
amount numeric
currency text
type text
note text
raw_input text
source text
created_at timestamptz
```

### goals

```sql
id uuid primary key
user_id uuid references users(id)
domain text
type text
target_value numeric
current_value numeric
unit text
status text
start_date date
end_date date
created_at timestamptz
updated_at timestamptz
```

### reminders

```sql
id uuid primary key
user_id uuid references users(id)
reminder_type text
title text
message text
reminder_time time
timezone text
schedule_rule jsonb
channel text
enabled boolean
last_triggered_at timestamptz
created_at timestamptz
updated_at timestamptz
```

### daily_states

```sql
id uuid primary key
user_id uuid references users(id)
date date
calories_consumed numeric
protein_consumed numeric
expenses_today numeric
goal_progress jsonb
missing_logs boolean
health_status text
finance_status text
summary text
created_at timestamptz
updated_at timestamptz
unique(user_id, date)
```

### memories

```sql
id uuid primary key
user_id uuid references users(id)
type text
summary text
source_event_id uuid
importance_score numeric
metadata jsonb
created_at timestamptz
updated_at timestamptz
```

The vector embedding itself should live in Qdrant, keyed by memory id and user id.

### events

```sql
id uuid primary key
user_id uuid references users(id)
event_type text
payload jsonb
source text
status text
created_at timestamptz
processed_at timestamptz
```

### summaries

```sql
id uuid primary key
user_id uuid references users(id)
summary_type text
date_start date
date_end date
content text
metrics jsonb
created_at timestamptz
```

### conversation_sessions

```sql
id uuid primary key
user_id uuid references users(id)
channel text
title text
summary text
last_message_at timestamptz
created_at timestamptz
updated_at timestamptz
```

### conversation_messages

```sql
id uuid primary key
session_id uuid references conversation_sessions(id)
user_id uuid references users(id)
role text
content text
structured_payload jsonb
token_count integer
created_at timestamptz
```

### notifications

```sql
id uuid primary key
user_id uuid references users(id)
type text
title text
body text
channel text
status text
metadata jsonb
read_at timestamptz
created_at timestamptz
```

### ai_usage_logs

```sql
id uuid primary key
user_id uuid references users(id)
request_type text
model text
input_tokens integer
output_tokens integer
estimated_cost numeric
latency_ms integer
metadata jsonb
created_at timestamptz
```

### ai_action_logs

```sql
id uuid primary key
user_id uuid references users(id)
conversation_message_id uuid
action_type text
tool_name text
input_payload jsonb
output_payload jsonb
confidence_score numeric
status text
error text
created_at timestamptz
```

Production database rules:

- All user-owned tables must index `user_id`.
- Add compound indexes for common dashboard filters such as `(user_id, created_at)`, `(user_id, date)`, and `(user_id, status)`.
- Use consistent audit fields: `created_at`, `updated_at`, and later `deleted_at` for soft delete where needed.
- Migrations should be versioned and reversible where practical.
- Sensitive values such as refresh tokens and Telegram link tokens are stored as hashes, never raw tokens.

## 9. Event Model

Initial event names:

- `user_created`
- `user_logged_in`
- `session_refreshed`
- `user_logged_out`
- `onboarding_started`
- `onboarding_completed`
- `telegram_link_token_created`
- `telegram_account_linked`
- `telegram_account_unlinked`
- `telegram_message_received`
- `voice_note_received`
- `voice_note_transcribed`
- `meal_logged`
- `expense_added`
- `goal_created`
- `goal_updated`
- `reminder_created`
- `reminder_triggered`
- `daily_state_updated`
- `daily_summary_generated`
- `weekly_summary_required`
- `inactive_user_detected`
- `memory_created`
- `memory_summarized`
- `notification_created`
- `ai_action_confirmed`
- `ai_action_rejected`

Event rules:

- Events should be immutable.
- Events should include `user_id`, `event_type`, `payload`, and `source`.
- Domain services emit events after successful state changes.
- n8n can trigger FastAPI endpoints to request work, but FastAPI decides what the work means.

## 10. API Surface

### Auth

- `POST /api/auth/google`
- `POST /api/auth/refresh`
- `POST /api/auth/logout`
- `GET /api/auth/me`

Auth flow:

- Client signs in with Firebase Google OAuth.
- Client sends Firebase identity token to FastAPI.
- FastAPI verifies the Firebase token with Firebase Admin SDK.
- FastAPI creates or resolves the canonical `users` record and `auth_providers` record.
- FastAPI issues a short-lived JWT access token and a rotated refresh token.
- Refresh tokens are stored hashed in `sessions` and delivered through secure, HTTP-only cookies where possible.
- Protected dashboard APIs require auth middleware that validates access tokens and loads the user context.
- Logout revokes the session and invalidates the refresh token.

### Onboarding

- `GET /api/onboarding/status`
- `PATCH /api/onboarding/step`
- `POST /api/onboarding/complete`
- `POST /api/onboarding/recommendations`

### Telegram Linking

- `POST /api/telegram/link-token`
- `POST /api/telegram/link/confirm`
- `POST /api/telegram/unlink`
- `GET /api/telegram/link/status`

Telegram linking flow:

1. Dashboard user clicks Connect Telegram.
2. FastAPI generates a temporary secure link token and stores only the hash.
3. Dashboard opens the Telegram bot with a `/start <token>` command.
4. Telegram webhook sends the token and `telegram_id` to FastAPI.
5. FastAPI validates token expiry, token hash, user ownership, and duplicate Telegram usage.
6. FastAPI links `telegram_id` to the authenticated user.
7. Reconnect creates a new link token and replaces the previous Telegram mapping after validation.
8. Unlink removes the Telegram mapping and blocks future Telegram access until relinked.

Telegram users must map to authenticated dashboard users before accessing personal health, finance, goal, reminder, or memory data.

### Telegram

- `POST /api/telegram/webhook`
- `POST /api/telegram/send-message`
- `POST /api/telegram/send-summary`

### Conversation

- `POST /api/agent/chat`
- `POST /api/conversation/message`
- `POST /api/conversation/voice`
- `GET /api/conversation/history`

### Dashboard

- `GET /api/dashboard/overview`
- `GET /api/dashboard/activity`
- `GET /api/dashboard/insights`

### Health

- `GET /api/health/daily`
- `GET /api/health/summary?range=today|week|month|custom&start_date=&end_date=`
- `GET /api/health/daily-details?date=YYYY-MM-DD`
- `GET /api/health/logs`
- `POST /api/health/logs`
- `PATCH /api/health/logs/{id}`
- `GET /api/health/goals`
- `POST /api/health/goals`
- `PATCH /api/health/goals/{id}`

### Finance

- `GET /api/finance/summary`
- `GET /api/finance/summary?range=today|week|month|custom&start_date=&end_date=`
- `GET /api/finance/daily-details?date=YYYY-MM-DD`
- `GET /api/finance/logs`
- `POST /api/finance/logs`
- `PATCH /api/finance/logs/{id}`
- `GET /api/finance/budgets`
- `POST /api/finance/goals`
- `PATCH /api/finance/goals/{id}`

### Goals

- `GET /api/goals`
- `POST /api/goals`
- `PATCH /api/goals/{id}`
- `POST /api/goals/suggestions`

### Reminders

- `GET /api/reminders`
- `POST /api/reminders`
- `PATCH /api/reminders/{id}`
- `POST /api/reminders/{id}/complete`
- `POST /api/reminders/{id}/snooze`

### Memory

- `GET /api/memory/search`
- `GET /api/memory/recent`
- `POST /api/memory`
- `PATCH /api/memory/{id}`

### Settings

- `GET /api/settings/profile`
- `PATCH /api/settings/profile`
- `PATCH /api/settings/notifications`
- `PATCH /api/settings/ai-preferences`

### Notifications

- `GET /api/notifications`
- `PATCH /api/notifications/{id}/read`
- `POST /api/notifications/test`

### Admin And Observability

- `GET /api/admin/health`
- `GET /api/admin/metrics`
- `GET /api/admin/jobs`
- `GET /api/admin/ai-usage`
- `GET /api/admin/workflows`

## 11. n8n Responsibilities

n8n should handle:

- Telegram webhook routing if desired.
- Cron-based reminders.
- Weekly report scheduling.
- Email delivery.
- Retry handling for failed notifications.
- Inactivity checks that call FastAPI.
- Lightweight workflow branching based on FastAPI responses.

n8n should not handle:

- AI reasoning.
- Meal or finance parsing.
- Business rules.
- Memory retrieval.
- Agent selection.
- Daily state calculations.

## 12. Dashboard Product Requirements

Main Dashboard:

- Daily health and finance overview.
- AI insight summary.
- Header Agent button that opens the in-app chat dialog.
- Mobile-first responsive layout with sidebar navigation on desktop and compact navigation on smaller screens.
- Top navigation for global actions, profile/session controls, Telegram connection status, and notification access.
- Loading, empty, error, and skeleton states for every dashboard module.
- Optimistic UI updates for manual logs, reminder completion, and goal edits.
- WebSocket live updates for reminders, notifications, daily state, and background job completion.
- Notification center for reminders, summaries, failed actions, and AI confirmations.
- Global search across logs, goals, memories, reminders, and conversations.
- Command palette later for quick actions.
- Activity timeline for domain events and user-visible changes.
- Pending reminders.
- Recent activity.
- Quick actions for logging meal, expense, reminder, and note.
- Header `Log meal` and `Add expense` actions open structured manual entry dialogs.

Dashboard state architecture:

- TanStack Query handles server cache, loading states, retries, invalidation, and API synchronization.
- Zustand handles app/session/UI state that should not be treated as server cache.
- `auth-store` owns access token state, user profile, onboarding state, and logout behavior.
- `conversation-store` owns open Agent dialog state, draft messages, and active conversation session.
- `notification-store` owns local notification center state and unread counts.
- `dashboard-store` owns selected ranges, active filters, sidebar state, and lightweight UI preferences.

Dashboard Agent:

- Supports the same user tasks as Telegram chat.
- Can answer health, finance, reminder, memory, and goal questions.
- Can help set health or finance goals by asking for missing data first.
- Must confirm with the user before saving goal or data changes.
- Uses AI suggestions as optional recommendations, not automatic writes.

Health Dashboard:

- Calories consumed versus target.
- Protein consumed versus target.
- Today is the default view.
- Date filters for Today, Last 7 days, This month, and Custom dates.
- Daily summary table with date, calories, protein, meals, goal status, and summary.
- Clickable date rows that open a detail dialog with meals, totals, goal progress, notes, and AI summary.
- Streaks and hydration.
- Health goals and progress.
- `Add meal` opens a structured form for date, time, meal type, food items, calories, protein, optional macros, notes, and source.
- Goal form for calories, protein, hydration, weight direction, and streak targets.
- Optional AI goal suggestions that the user may accept or ignore.

Finance Dashboard:

- Spending today and this month.
- Savings progress.
- Today is the default view.
- Date filters for Today, Last 7 days, This month, and Custom dates.
- Daily summary table with date, spent, saved, top category, transactions, and summary.
- Clickable date rows that open a detail dialog with transactions, totals, goal progress, notes, and AI summary.
- Category breakdown.
- Budget alerts.
- `Add expense` opens a structured form for date, amount, currency, category, transaction type, payment method, note, and source.
- Finance goal form for monthly budget, savings target, category caps, and spending alerts.
- Optional AI goal suggestions after the agent asks for income, fixed expenses, and priorities.

Reminders Dashboard:

- Upcoming reminders.
- Missed reminders.
- Completion and snooze actions.
- Reminder preferences.

Memory Dashboard:

- Recent learned preferences.
- Long-term goals.
- Important conversation summaries.
- Memory search later.

Settings Dashboard:

- Profile.
- Timezone.
- Sleep and wake times.
- Notification channels.
- AI response style.
- Data privacy controls.

Goal Workflow:

- Users can create or update goals manually from dashboard goal forms.
- Users can create or update goals conversationally through Telegram or Dashboard Agent.
- When required data is missing, the agent asks focused follow-up questions before creating the goal.
- AI can suggest targets from historical behavior, current progress, and stated goals.
- Suggestions are never saved automatically; the final saved values come from explicit user confirmation or manual form input.
- Goal updates emit events so daily state, reminders, and dashboard analytics can react.

Manual Entry vs Agent Entry:

- Manual dashboard entry is for users who already know the exact values and want to fill structured fields directly.
- Agent entry is for users who want to describe meals or expenses naturally.
- The Agent may estimate nutrition, categorize expenses, and ask follow-up questions for missing fields.
- Any Agent-created meal, expense, or goal must be confirmed by the user before saving.

## 13. Security And Data Handling

Required:

- JWT auth for dashboard APIs.
- Firebase Authentication validation for Google OAuth.
- FastAPI-owned session management and refresh token rotation.
- Secure HTTP-only cookies for refresh tokens where possible.
- Short access token expiration and long refresh token expiration with rotation.
- Logout and session revocation.
- Auth middleware for all protected dashboard APIs.
- Telegram webhook secret validation.
- Telegram account linking through temporary expiring hashed tokens.
- Per-user data isolation in PostgreSQL and Qdrant.
- Environment-based secrets management.
- Rate limiting by IP, user id, auth endpoint, Telegram webhook, and Agent route.
- Input validation through Pydantic.
- Audit logging for sensitive updates.
- AI action audit logs for tool calls and write operations.
- Encryption at rest where infrastructure supports it.
- Field-level encryption for sensitive profile data later if needed.
- CSRF protection for cookie-based dashboard sessions.
- Webhook signature verification for Telegram and n8n callbacks.
- RBAC-ready architecture even if MVP only has normal users.
- Abuse prevention for repeated AI calls, scraping, spam, and malicious automation.
- Prompt injection awareness for user-provided content, memory retrieval, and tool execution.
- No raw API keys in source control.

Privacy rules:

- Store raw user input for traceability, but allow deletion later.
- Keep memory summaries concise and user-scoped.
- Avoid making medical, legal, or financial guarantees.
- Ask clarifying questions when confidence is low.

## 14. Authentication And Onboarding Architecture

Authentication providers:

- Google Login through Firebase Authentication.

Telegram is not an authentication provider. It is a linked communication channel used for bot access, reminders, notifications, and conversational sync after the user has authenticated through the dashboard.

FastAPI remains the source of truth for:

- user creation and profile ownership
- JWT access tokens
- refresh tokens and sessions
- onboarding state
- AI profile creation
- Telegram linking
- permissions

Token and session behavior:

- Access tokens are short-lived JWTs used by dashboard API requests.
- Refresh tokens are long-lived, rotated on refresh, stored hashed in `sessions`, and revoked on logout.
- Session records store device, user agent, IP, expiry, and revoked status.
- Protected APIs require auth middleware that resolves the user and attaches a request context.
- `/api/auth/me` returns the authenticated user, onboarding status, Telegram link status, and basic permissions.

Onboarding should collect:

- timezone
- age
- gender, optional
- weight
- height
- activity level
- dietary preference
- monthly income
- savings goals
- reminder preferences
- sleep and wake time
- preferred AI tone or style

Onboarding behavior:

- Persist each onboarding step so users can resume later.
- Set `users.onboarding_completed` only after required steps are complete.
- Initialize health and finance goals from onboarding data.
- Initialize reminder defaults from wake/sleep time and preferences.
- Initialize memory context with explicit user preferences and goals.
- Initialize dashboard state and first daily state.
- Run an onboarding recommendation engine that proposes initial targets, but lets the user approve or edit them.

## 15. Conversation And Memory Lifecycle

Memory layers:

- Short-term memory: recent conversation state, unresolved tasks, and current session context.
- Long-term memory: durable preferences, routines, goals, patterns, and important facts.
- Structured memory: SQL-backed goals, logs, reminders, daily states, summaries, and profile data.
- Semantic memory: Qdrant-backed embeddings for summarized memories and relevant conversation chunks.

Lifecycle rules:

- Raw chat history should not always be sent directly to the LLM.
- Old conversations should be chunked, summarized, scored, and stored for retrieval.
- Memory importance scoring determines what becomes durable memory.
- Memory decay and archive rules should reduce stale or low-value context over time.
- The orchestrator retrieves only relevant context using hybrid retrieval: SQL filters plus vector search.
- Contextual retrieval ranking should consider recency, importance, domain, source, and user intent.
- Token budget management must cap retrieved memories, chat history, tool outputs, and final prompt size.
- Conversation sessions and messages are stored for audit, continuity, and summarization, but the LLM receives a curated context package.

## 16. AI Reliability And Safety Layer

AI reliability requirements:

- Agents return structured JSON outputs wherever business actions are needed.
- All AI outputs that drive writes must pass schema validation.
- Tool execution uses typed inputs and outputs.
- Confidence scoring is required for parsing, categorization, and suggested actions.
- Low-confidence responses trigger clarification questions.
- User confirmation is required before writes created by AI conversation.
- Retry handling should cover transient model/API failures.
- Fallback responses should be available when AI is unavailable.
- Hallucination reduction uses retrieval grounding, tool-first design, and explicit uncertainty handling.
- AI response moderation should protect unsafe, abusive, or policy-sensitive content.

Operational AI controls:

- Store AI action audit logs for proposed and executed writes.
- Store structured tool execution logs.
- Version prompts and agent instructions.
- Add prompt testing for core intents such as meal logging, expense logging, goal setting, summaries, and reminders.
- Track model, token usage, latency, cost, prompt version, and tool outcomes for every AI request.

## 17. Observability And Monitoring

Production observability requirements:

- Structured logging with request id, user id, trace id, route, status, and latency.
- Request tracing across dashboard, FastAPI, workers, n8n, Telegram, OpenAI, PostgreSQL, and Qdrant.
- AI latency tracking by model and route.
- Token usage tracking and OpenAI cost tracking.
- Workflow monitoring for n8n jobs and notification delivery.
- Failed job tracking and retry metrics.
- Error monitoring and alerting.
- Health checks for API, database, Redis, Qdrant, OpenAI connectivity, workers, and n8n callbacks.

Metrics dashboard requirements:

- active users
- Telegram linked users
- onboarding completion rate
- reminder delivery success
- AI request volume
- AI cost by user and feature
- failed jobs and dead-letter queue count
- average response latency
- top API errors

## 18. Background Jobs And Queue Architecture

Future recommended stack:

- Redis for broker/cache/rate-limit primitives.
- Celery or Dramatiq for async job workers.

Queue responsibilities:

- summary generation
- memory summarization
- embedding generation
- reminder scheduling handoff
- analytics aggregation
- weekly reports
- notification delivery retries
- event consumers

Queue rules:

- User-facing requests should enqueue long-running work instead of blocking.
- Jobs should be idempotent where possible.
- Retries should use backoff and max-attempt limits.
- Dead-letter queues store permanently failed jobs for inspection.
- Event consumers process domain events into notifications, summaries, analytics, and memory updates.

## 19. Cost Optimization Strategy

AI cost controls:

- Token budgeting per request type.
- Selective memory retrieval instead of full history injection.
- Conversation summarization to reduce repeated context.
- Embedding reuse for unchanged memories.
- Response caching for deterministic or repeated analytics summaries.
- Low-cost models for lightweight classification, extraction, and routing tasks.
- Higher-capability models reserved for complex reasoning and summary generation.
- Rate limiting on expensive AI routes.
- Usage quotas later by plan/user tier.

Usage tracking:

- Log model, feature, token counts, latency, estimated cost, and user id in `ai_usage_logs`.
- Show internal AI usage analytics in admin dashboards.
- Add per-user usage limits later for SaaS plans.

## 20. Future Scalability Notes

Future expansion paths:

- WhatsApp integration.
- Mobile app.
- Email assistant.
- Calendar integrations.
- Wearable integrations.
- Additional AI agents such as productivity, journaling, learning, fitness, career, and scheduling.
- Subscriptions and payments.
- Multi-language support.
- Enterprise or team workspaces later.
- Plugin architecture for new agents, tools, channels, and workflows.

## 21. Development Phases

### Phase 1: Core MVP

- Set up FastAPI project structure.
- Add Firebase-backed Google auth handoff.
- Add FastAPI-owned users, auth providers, sessions, refresh token rotation, and protected API middleware.
- Add onboarding persistence, onboarding completion, and initial AI profile creation.
- Add secure Telegram account linking and unlinking.
- Add PostgreSQL models and migrations.
- Add Telegram webhook handling.
- Add OpenAI conversation orchestration.
- Add health and finance structured logging.
- Add daily state engine.
- Add health and finance date-range summaries and daily detail endpoints.
- Add manual and conversational goal-setting workflows.
- Add Qdrant memory storage and retrieval.
- Add reminder APIs.
- Add n8n workflow contracts.
- Build Next.js dashboard overview, Agent chat, health, finance, reminders, goals, and settings.

### Phase 2: Intelligence Expansion

- Improve semantic memory ranking.
- Add conversation summarization lifecycle and memory decay/archive rules.
- Add weekly reports.
- Add richer proactive insights.
- Add streaks, trends, and anomaly detection.
- Add dashboard live updates.
- Add better finance budgets and health goals.
- Add richer goal suggestions and approval flows.
- Add Redis-backed workers for summaries, embeddings, analytics, and reminders.
- Add observability dashboards and AI usage analytics.

### Phase 3: Advanced System

- Add plug-and-play agent registration.
- Add productivity, journaling, fitness, and learning agents.
- Add predictive suggestions.
- Add mobile app.
- Add WhatsApp, email assistant, calendar, and wearable integrations.
- Add subscriptions, payments, and usage quotas.
- Add multi-language support.
- Add richer automation and integrations.

## 22. MVP Acceptance Criteria

The MVP is successful when:

- A user can sign up with Google and receive FastAPI-issued app tokens.
- A user can resume or complete onboarding and get initialized goals, reminders, memory context, and dashboard state.
- A user can securely link Telegram to their authenticated dashboard account.
- A user can send a meal by Telegram text and see it in the dashboard.
- A user can send a voice note and receive a transcription-based response.
- A user can log an expense and see category totals.
- The system updates the user's daily state after health or finance logs.
- The dashboard shows daily health, finance, reminders, recent activity, goals, and AI insights.
- A user can open Dashboard Agent and ask the same core questions supported through Telegram.
- A user can review health and finance data for today, last 7 days, this month, and custom date ranges.
- A user can click a date summary and inspect detailed health or finance data for that day.
- A user can create or update health and finance goals manually from the dashboard.
- A user can create or update health and finance goals through chat after the agent collects missing data and receives confirmation.
- The system retrieves relevant memories before generating responses.
- n8n can trigger a reminder without owning business logic.
- All user-specific reads and writes are isolated by user id.
- AI-generated writes require user confirmation and create audit logs.
- Core AI usage, errors, and job failures are observable internally.

## 23. Testing Plan

Backend tests:

- Unit tests for Firebase Google token validation adapters, session creation, refresh token rotation, and logout.
- Unit tests for onboarding step persistence and default goal/reminder initialization.
- Unit tests for Telegram link token creation, expiry, duplicate protection, unlink, and reconnect.
- Unit tests for health parsing, nutrition calculation, finance parsing, and categorization.
- Unit tests for daily state aggregation.
- Unit tests for memory save and retrieval interfaces.
- Unit tests for goal suggestion, goal validation, and user confirmation handling.
- API tests for Telegram webhook, health logs, finance logs, reminders, and dashboard overview.
- API tests for auth, onboarding, Telegram linking, protected APIs, and session invalidation.
- API tests for Agent chat, date-range summaries, daily detail endpoints, and goal create/update endpoints.
- Event tests confirming important state changes emit expected events.
- Worker tests for idempotency, retry behavior, and dead-letter handling later.

Frontend tests:

- Auth flow, onboarding flow, protected-route, and logout tests.
- Dashboard module rendering tests.
- Agent dialog open, send, response, and close tests.
- Data loading and error state tests.
- Skeleton, empty, and error state tests for core dashboard modules.
- Form validation tests for reminders, settings, meal logs, and expenses.
- Date filter tests for Today, Last 7 days, This month, and Custom dates.
- Clickable daily summary row tests for health and finance detail dialogs.
- Goal form tests for manual values and accepted AI suggestions.
- Responsive layout checks for dashboard pages.

Integration tests:

- Google auth to FastAPI session creation.
- Onboarding completion to initialized profile, goals, reminders, memory context, and dashboard state.
- Dashboard Telegram linking to `/start <token>` to linked `telegram_id`.
- Telegram message to health log.
- Telegram voice note to transcription to agent response.
- Expense message to finance log.
- Dashboard Agent message to orchestrator response.
- Health and finance date range summary retrieval.
- Daily summary drilldown retrieval.
- Goal creation from dashboard form.
- Goal creation from chat after confirmation.
- Reminder workflow from n8n to FastAPI to Telegram.
- Daily summary generation.
- Background job creation, retry, and failure observability later.

## 24. First Implementation Order

1. Finalize dashboard UI direction using `dashboard.html`.
2. Create backend FastAPI scaffold.
3. Implement Firebase token validation plus FastAPI users, auth providers, sessions, access tokens, refresh tokens, and auth middleware.
4. Implement onboarding persistence and initial AI profile/goal/reminder setup.
5. Create database models and migrations.
6. Implement secure Telegram linking, unlinking, reconnect, and Telegram webhook guardrails.
7. Implement Telegram text webhook.
8. Implement orchestrator shell and agent registry.
9. Implement health and finance logging tools.
10. Implement daily state engine.
11. Implement date-range health and finance summaries with daily detail endpoints.
12. Implement goal creation, update, and AI suggestion workflows.
13. Implement memory storage with Qdrant and basic hybrid retrieval.
14. Implement reminder service and n8n workflow contracts.
15. Add basic AI action logs, usage logs, structured logging, and health checks.
16. Build Next.js dashboard using the approved HTML prototype as the visual guide.
