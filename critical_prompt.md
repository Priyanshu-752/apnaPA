# apnaPA Project Vision

**Project**: apnaPA AI Personal Manager  
**Status**: Frontend route scaffold ready, backend scaffold implemented  
**Source of Truth**: `plan.md`

---

## What This Is

apnaPA is an AI-powered personal operating system and conversational life assistant. It helps users manage health, finance, routines, reminders, goals, memory, and daily summaries through proactive, personal, memory-aware conversations.

The product should feel like a useful personal manager, not a generic chatbot dashboard.

---

## The Problem

People often track meals, expenses, goals, reminders, and personal plans across disconnected apps. Context gets lost, routines are hard to maintain, and assistants rarely remember enough to help proactively.

---

## The Solution

Build a multi-user AI platform where FastAPI owns identity, product state, AI orchestration, business logic, memory, events, and agent coordination. Telegram is the first external conversation channel, and the dashboard is the first visual control surface.

Both Telegram and the dashboard Agent use the same backend orchestrator, memory retrieval, typed tools, confirmation rules, and user-scoped data.

The current frontend already reflects this at the routing level: auth is separated from protected dashboard screens, and the dashboard surface is split into route-based screens instead of a single-page mock.

The current backend already reflects this at the scaffold level: FastAPI owns app boot, auth/session helpers, protected dependencies, route registration, agent routing stubs, and workflow webhook contracts.

---

## Core Principles

1. **Conversational first**: Users should be able to describe meals, expenses, reminders, and goals naturally.
2. **Backend-owned intelligence**: FastAPI is the central AI brain; n8n handles scheduling and delivery, not domain reasoning.
3. **Memory-aware and user-scoped**: Long-term memory, structured data, and vector retrieval must remain isolated per user.
4. **Confirmed writes**: AI-generated meal, expense, goal, reminder, and profile changes require explicit user confirmation before saving.
5. **Event-driven foundation**: Important state changes emit events for summaries, analytics, reminders, notifications, and future agents.
6. **Simple MVP before autonomy**: Prioritize reliable logging, memory retrieval, reminders, summaries, dashboard visibility, auth, and Telegram integration.

---

## MVP Success Criteria

- A user can sign in with Google and receive FastAPI-issued app tokens.
- A user can complete onboarding and get initialized goals, reminders, memory context, and dashboard state.
- A user can securely link Telegram to their authenticated dashboard account.
- A user can log meals and expenses through Telegram and see them in the dashboard.
- A user can send a Telegram voice note and receive a transcription-based response.
- The dashboard shows health, finance, reminders, goals, recent activity, and AI insights.
- Dashboard Agent supports the same core tasks as Telegram chat.
- Health and finance summaries support today, last 7 days, this month, and custom date ranges.
- Relevant memories are retrieved before AI responses.
- n8n can trigger reminders without owning business logic.
- User-specific reads and writes are isolated by user id.
- AI-generated writes create audit logs and require confirmation.

---

## Scope

### MVP Scope

- Google auth through Firebase Authentication.
- FastAPI-owned users, sessions, JWT access tokens, refresh tokens, onboarding state, and Telegram linking.
- Telegram text and voice-note conversation flows.
- Meal logging with calorie and protein tracking.
- Expense logging with categories and savings progress.
- Reminders, daily summaries, goals, memory, and dashboard analytics.
- OpenAI-backed orchestration, transcription, embeddings, and structured outputs.
- PostgreSQL for structured data and Qdrant for vector memory.
- n8n for scheduled jobs, retries, and delivery workflows.

### Future Scope

- WhatsApp, email, calendar, wearable, and mobile integrations.
- Productivity, journaling, learning, fitness, career, and scheduling agents.
- Subscriptions, payments, usage quotas, and multi-language support.
- Richer proactive planning and predictive suggestions.

### Non-Goals For MVP

- Mobile app.
- Image-based food recognition.
- Full autonomous planning.
- Multi-user family or team spaces.
- Advanced investment advice.
- Complex medical recommendations.
- Subscriptions, teams, or enterprise administration.

---

## Glossary

| Term | Meaning |
| --- | --- |
| Dashboard Agent | In-app conversational assistant that uses the same orchestrator as Telegram. |
| Orchestrator Agent | Backend entry point that detects intent, retrieves memory, calls tools, routes sub-agents, and enforces confirmations. |
| Sub-agent | Domain agent such as Health, Finance, or Memory that only runs through the orchestrator. |
| Memory Service | User-scoped storage and retrieval for preferences, goals, routines, patterns, and summaries. |
| n8n | Automation layer for scheduling, retries, and delivery workflows. |
| Canonical user | Authenticated dashboard user owned by FastAPI; Telegram accounts link to this user. |

---

Every future implementation decision should serve the product rules and architecture in `plan.md`.
