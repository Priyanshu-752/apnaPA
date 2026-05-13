# Official Resources

Use official docs first. Add short notes here when a resource directly supports apnaPA implementation.

---

## Frontend

- Next.js App Router: https://nextjs.org/docs/app  
  Use when migrating the current static mock to the planned Next.js app.

- Next.js installation: https://nextjs.org/docs/app/getting-started/installation  
  Notes: current docs list Node.js 20.9+ as the minimum and describe the `create-next-app` defaults.

- Next.js TypeScript: https://nextjs.org/docs/app/api-reference/config/typescript  
  Use for route-aware types and TypeScript project setup.

---

## FastAPI

- Bigger applications and `APIRouter`: https://fastapi.tiangolo.com/tutorial/bigger-applications/  
  Use for splitting route groups into auth, onboarding, Telegram, agent, health, finance, and admin modules.

- Dependencies: https://fastapi.tiangolo.com/tutorial/dependencies/  
  Use for database sessions, current-user loading, settings injection, and webhook validation.

- Testing: https://fastapi.tiangolo.com/tutorial/testing/  
  Use for route tests with `TestClient`.

---

## Pydantic

- Pydantic Settings: https://docs.pydantic.dev/2.0/usage/pydantic_settings/  
  Use for typed environment configuration, dotenv values, and test overrides.

---

## OpenAI And Agents

- Function calling and Structured Outputs: https://platform.openai.com/docs/guides/function-calling/function-calling-with-structured-outputs  
  Use for typed tool calls and schema-bound agent outputs.

- OpenAI function calling overview: https://help.openai.com/en/articles/8555517-function-calling-in-the-openai-api  
  Use for conceptual understanding of tools, tool calls, and Structured Outputs.

---

## RAG And Vector Memory

- Qdrant collections: https://qdrant.tech/documentation/concepts/collections/  
  Use for designing the vector collection that stores memory embeddings.

- Qdrant filtering: https://qdrant.tech/documentation/concepts/filtering/  
  Use for enforcing `user_id` filters and memory metadata filters during retrieval.

---

## n8n

- Webhook workflow development: https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.webhook/workflow-development/  
  Use for understanding test vs production webhook URLs.

- Webhook credentials: https://docs.n8n.io/integrations/builtin/credentials/webhook/  
  Use for webhook authentication options such as header auth and JWT auth.
