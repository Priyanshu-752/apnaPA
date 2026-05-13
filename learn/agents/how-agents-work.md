# How apnaPA Agents Work

The agent system is the AI reasoning layer, but it must stay safe and predictable.

---

## The Simple Mental Model

```text
User message
  -> orchestrator
  -> memory retrieval
  -> intent detection
  -> selected domain agent
  -> typed tool proposal
  -> validation
  -> user confirmation if write
  -> backend service write
  -> event
  -> response
```

---

## Orchestrator

The orchestrator is the only user-facing agent entry point.

It owns:

- detecting intent.
- collecting relevant memories.
- choosing a domain agent.
- enforcing token budgets.
- deciding if clarification is needed.
- enforcing confirmation rules.
- shaping the final response.

---

## Domain Agents

Domain agents do focused work:

- Health Agent: meals, calories, protein, hydration, health goals.
- Finance Agent: expenses, categories, budgets, savings, summaries.
- Memory Agent or Service: preferences, goals, routines, summaries, retrieval.

Sub-agents do not send independent user messages. They return structured outputs to the orchestrator.

---

## Tools

Tools are backend functions the agent can ask to use.

Examples:

- `parse_meal_input`
- `calculate_nutrition`
- `save_health_log`
- `parse_finance_input`
- `categorize_transaction`
- `save_finance_log`
- `create_reminder`
- `retrieve_memories`

Important: a tool call is not automatically trusted. The backend validates tool inputs and outputs.

---

## Confirmation Rule

Any AI-generated write must pause for confirmation.

Examples:

- saving a meal.
- saving an expense.
- creating a goal.
- creating a reminder.
- changing preferences.

The frontend mock already demonstrates this with deterministic confirmation drafts in `frontend/src/lib/agent.ts`.

---

## Structured Outputs

Agents should return structured JSON for business actions. That output is validated with schemas before the backend saves anything.

Official reference: OpenAI function calling and Structured Outputs describe connecting models to tools and making tool arguments match a JSON schema.

---

## First Agent Code We Will Build Later

- base agent interface.
- intent enum.
- execution context schema.
- registry.
- orchestrator shell.
- health and finance stubs.
- dummy tools.
- tests that prove write proposals require confirmation.
