# RAG And Memory Plan

RAG means retrieval-augmented generation. For apnaPA, it means the assistant retrieves relevant user memories before responding.

---

## Why apnaPA Needs RAG

The assistant should remember:

- preferences.
- goals.
- routines.
- recurring health patterns.
- recurring finance patterns.
- conversation summaries.
- important facts.

But it should not send the full chat history to the model every time. That is expensive, noisy, and less safe.

---

## Memory Layers

| Layer | Store | Example |
| --- | --- | --- |
| Structured memory | PostgreSQL | goals, reminders, logs, daily states |
| Semantic memory | Qdrant | embeddings for summaries and important facts |
| Short-term memory | conversation session | unresolved current task |
| Prompt context | orchestrator | curated memories sent to model |

---

## Retrieval Flow

```text
User asks something
  -> detect likely domain
  -> SQL filters by user_id, domain, recency
  -> vector search in Qdrant by user_id
  -> rank by relevance, recency, importance
  -> fit into token budget
  -> pass curated context to orchestrator
```

---

## Qdrant Shape

Each vector point should include payload fields like:

- `user_id`
- `memory_id`
- `type`
- `domain`
- `importance_score`
- `created_at`
- `source_event_id`

The vector collection stores embeddings. PostgreSQL remains the source of truth for the memory record.

Official reference: Qdrant collections are named sets of vector points, and Qdrant filtering supports payload conditions that will be needed for user-scoped retrieval.

---

## Safety Rules

- Always filter by `user_id`.
- Do not retrieve another user's memory.
- Do not blindly trust retrieved text if it conflicts with current user input.
- Keep memory snippets concise.
- Save durable memories only when they are useful and user-scoped.
- Avoid storing secrets or sensitive data as long-term memory unless the user explicitly asks and the product supports it safely.

---

## First RAG Code We Will Build Later

- memory schema.
- Qdrant client wrapper.
- embedding service interface.
- retriever with user filter.
- summarizer interface.
- tests for user isolation and ranking behavior with dummy vectors.
