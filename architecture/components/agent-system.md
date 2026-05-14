# Agent System Architecture

**Status**: Orchestrator scaffold implemented  
**Source**: `../../plan.md`

---

## Purpose

The agent system turns user messages from Telegram and Dashboard Agent into safe, structured, memory-aware actions. It routes work through one orchestrator and domain sub-agents.

No sub-agent talks directly to the user. The orchestrator assembles context, calls tools, validates outputs, asks for clarification, and enforces confirmation before writes.

---

## Core Agents

| Agent | Responsibilities |
| --- | --- |
| Orchestrator | Intent detection, memory retrieval, context assembly, routing, tool coordination, confirmation policy |
| Health Agent | Meal parsing, nutrition estimates, health logs, hydration, goals, health summaries |
| Finance Agent | Expense/income parsing, categorization, budgets, savings progress, finance summaries |
| Memory Agent or Service | Durable preferences, routines, goals, patterns, conversation summaries, retrieval |

---

## Shared Agent Contract

All agents should expose:

- `name`
- `supported_intents`
- `input_schema`
- `output_schema`
- `available_tools`
- `execute(context, payload)`
- `fallback(context, error)`

Agent execution context includes:

- `user_id`
- conversation or session id
- source channel: dashboard, Telegram, n8n, or worker
- retrieved memories
- daily state
- permissions and safety policy
- token budget
- trace id

---

## Intent Set

Initial intents:

- `log_meal`
- `log_expense`
- `ask_health_summary`
- `ask_finance_summary`
- `set_goal`
- `set_reminder`
- `update_preferences`
- `general_conversation`
- `unknown_or_needs_clarification`

---

## Tool Pattern

Tools are typed service wrappers, not free-form code execution.

| Tool Group | Examples |
| --- | --- |
| Health | `parse_meal_input`, `calculate_nutrition`, `save_health_log`, `get_daily_health_state`, `update_health_goal` |
| Finance | `parse_finance_input`, `categorize_transaction`, `save_finance_log`, `get_finance_state`, `update_budget_or_goal` |
| Reminder | Create, update, complete, snooze, and list reminders |
| Memory | Retrieve, save, summarize, score importance |
| Conversation | Save messages, summarize sessions, fetch history |

---

## Agent Flow

```text
User message
  -> channel adapter
  -> FastAPI conversation route
  -> orchestrator context builder
  -> memory retrieval
  -> intent detection
  -> selected domain agent
  -> typed tool proposal
  -> schema validation
  -> confirmation required for writes
  -> service write after confirmation
  -> events emitted
  -> final response
```

---

## Safety and Reliability Rules

- Low-confidence extraction asks a focused clarification question.
- AI outputs that drive writes must validate against Pydantic schemas.
- Writes proposed by conversation require explicit user confirmation.
- Prompt versions live under `backend/app/prompts/versions/`.
- Tool calls create AI action logs.
- AI requests create usage logs with model, token counts, latency, and cost estimate.
- User memory retrieval is scoped by user id.
- Retrieved memory is curated and token-budgeted, not full-history injection.
- Agent failures use fallbacks that preserve user trust and avoid fake certainty.

---

## First Implementation Slice

Build an orchestrator shell before rich AI behavior:

- Base agent interface.
- Agent registry.
- Execution context schema.
- Intent enum.
- Structured response schema.
- Health and finance agent stubs.
- Memory retriever interface.
- Tool result and confirmation proposal schemas.
- Unit tests for registry, routing, and confirmation-required write proposals.

Current scaffold now exists in:

- `../../backend/app/agents/base.py`
- `../../backend/app/agents/registry.py`
- `../../backend/app/agents/orchestrator/service.py`
- `../../backend/app/agents/health/agent.py`
- `../../backend/app/agents/finance/agent.py`
- `../../backend/tests/test_agents.py`
