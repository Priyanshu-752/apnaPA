# AI Personal Manager System Plan

## 1. Product Summary

The AI Personal Manager System is a proactive life operating system that helps users track health, nutrition, finances, reminders, routines, and long-term goals through natural conversation.

The first production communication channel is Telegram. The first visual control surface is a web dashboard with an in-app Agent chat dialog. FastAPI owns the AI orchestration, business logic, memory handling, event generation, goal workflows, and agent coordination. n8n handles scheduling, workflow retries, and notification delivery, but does not own AI reasoning or domain decisions.

Communication surfaces:

- Telegram remains the primary external conversation channel.
- Dashboard Agent is the in-app conversation channel for asking questions, reviewing summaries, setting goals, and updating structured data.
- Both surfaces use the same FastAPI orchestrator, memory retrieval, tools, and confirmation rules.

## 2. MVP Goals

The MVP should prove that a user can talk to the system every day and receive useful, structured, proactive assistance.

Core MVP capabilities:

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

Out of scope for the first MVP:

- Mobile app.
- Image-based food recognition.
- Full autonomous planning.
- Multi-user family or team spaces.
- Advanced investment advice.
- Complex medical recommendations.

## 3. Target Architecture

```txt
Telegram Bot
   |
   | webhook / messages / files
   v
n8n Automation Layer
   |
   | workflow triggers / retries / scheduled tasks
   v
FastAPI Core Backend
   |
   +-- Orchestrator Agent
   +-- Health Agent
   +-- Finance Agent
   +-- Memory Service
   +-- Reminder Service
   +-- Event Bus
   |
   +-- OpenAI APIs
   +-- PostgreSQL
   +-- Qdrant Vector Memory
   |
   v
Next.js Dashboard
```

Main rules:

- FastAPI is the central AI brain.
- Telegram and the dashboard use the same backend APIs.
- n8n handles scheduling and delivery, not business logic.
- Agents use structured tools and typed outputs.
- User memory is centralized and isolated by user.
- Every important action emits an event.
- Future agents are registered through a shared agent interface.

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

## 5. Backend Folder Structure

```txt
backend/
  app/
    api/
      routes/
      dependencies.py
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
      reminder_service.py
      analytics_service.py
      daily_state_service.py
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
    prompts/
    utils/
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
    dashboard/
    health/
    finance/
    reminders/
    memory/
    settings/
  stores/
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
created_at timestamptz
updated_at timestamptz
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

## 9. Event Model

Initial event names:

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

Event rules:

- Events should be immutable.
- Events should include `user_id`, `event_type`, `payload`, and `source`.
- Domain services emit events after successful state changes.
- n8n can trigger FastAPI endpoints to request work, but FastAPI decides what the work means.

## 10. API Surface

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
- Pending reminders.
- Recent activity.
- Quick actions for logging meal, expense, reminder, and note.
- Header `Log meal` and `Add expense` actions open structured manual entry dialogs.

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
- Telegram webhook secret validation.
- Per-user data isolation in PostgreSQL and Qdrant.
- Environment-based secrets management.
- Rate limiting for public endpoints.
- Input validation through Pydantic.
- Audit logging for sensitive updates.
- Encryption at rest where infrastructure supports it.
- No raw API keys in source control.

Privacy rules:

- Store raw user input for traceability, but allow deletion later.
- Keep memory summaries concise and user-scoped.
- Avoid making medical, legal, or financial guarantees.
- Ask clarifying questions when confidence is low.

## 14. Development Phases

### Phase 1: Core MVP

- Set up FastAPI project structure.
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
- Add weekly reports.
- Add richer proactive insights.
- Add streaks, trends, and anomaly detection.
- Add dashboard live updates.
- Add better finance budgets and health goals.
- Add richer goal suggestions and approval flows.

### Phase 3: Advanced System

- Add plug-and-play agent registration.
- Add productivity, journaling, fitness, and learning agents.
- Add predictive suggestions.
- Add mobile app.
- Add richer automation and integrations.

## 15. MVP Acceptance Criteria

The MVP is successful when:

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

## 16. Testing Plan

Backend tests:

- Unit tests for health parsing, nutrition calculation, finance parsing, and categorization.
- Unit tests for daily state aggregation.
- Unit tests for memory save and retrieval interfaces.
- Unit tests for goal suggestion, goal validation, and user confirmation handling.
- API tests for Telegram webhook, health logs, finance logs, reminders, and dashboard overview.
- API tests for Agent chat, date-range summaries, daily detail endpoints, and goal create/update endpoints.
- Event tests confirming important state changes emit expected events.

Frontend tests:

- Dashboard module rendering tests.
- Agent dialog open, send, response, and close tests.
- Data loading and error state tests.
- Form validation tests for reminders, settings, meal logs, and expenses.
- Date filter tests for Today, Last 7 days, This month, and Custom dates.
- Clickable daily summary row tests for health and finance detail dialogs.
- Goal form tests for manual values and accepted AI suggestions.
- Responsive layout checks for dashboard pages.

Integration tests:

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

## 17. First Implementation Order

1. Finalize dashboard UI direction using `dashboard.html`.
2. Create backend FastAPI scaffold.
3. Create database models and migrations.
4. Implement Telegram text webhook.
5. Implement orchestrator shell and agent registry.
6. Implement health and finance logging tools.
7. Implement daily state engine.
8. Implement date-range health and finance summaries with daily detail endpoints.
9. Implement goal creation, update, and AI suggestion workflows.
10. Implement memory storage with Qdrant.
11. Implement reminder service and n8n workflow contracts.
12. Build Next.js dashboard using the approved HTML prototype as the visual guide.
