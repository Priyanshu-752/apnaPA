# Video Guides

Use official docs first, then use these videos to make the ideas feel concrete. I picked the n8n links from n8n's own docs, and the FastAPI or agent links are practical community walkthroughs that match the architecture of this repo.

---

## FastAPI

- Python API Development - Comprehensive Course for Beginners  
  https://www.youtube.com/watch?v=0sOvCWFmrtA  
  Best for learning routers, JWT auth, testing, SQLAlchemy, and deployment in one long build.

- API integration Course - Modern Python with FastAPI  
  https://www.youtube.com/watch?v=rkPIftzu1pQ  
  Best for seeing FastAPI used with external APIs and AI-flavored app patterns.

How to use these with this repo:

- Watch the router and auth sections, then compare them with `backend/app/api/routes/auth.py` and `backend/app/api/dependencies.py`.

---

## Agents

- OpenAI Agents SDK Tutorial (FULL SERIES)  
  https://www.youtube.com/watch?v=gFcAfU3V1Zo  
  Best for tool calling, handoffs, guardrails, tracing, and multi-turn patterns.

How to use this with this repo:

- Compare the video concepts with `backend/app/agents/base.py`, `backend/app/agents/registry.py`, and `backend/app/agents/orchestrator/service.py`.

---

## n8n

- n8n Beginner course playlist  
  https://www.youtube.com/playlist?list=PLlET0GsrLUL59YbxstZE71WszP3pVnZfI  
  Start here if you are new to n8n.

- n8n Beginner Course (2/9) - Introduction to APIs and Webhooks  
  https://www.youtube.com/watch?v=y_cpFMF1pzk  
  Best for understanding exactly how n8n receives and sends webhook payloads.

- n8n Advanced course playlist  
  https://www.youtube.com/playlist?list=PLlET0GsrLUL5bxmx5c1H1Ms_OtOPYZIEG  
  Use this after you are comfortable with the basics.

How to use these with this repo:

- Build a test workflow that posts to `POST /api/workflows/reminders/trigger`.
- Then read `learn/n8n/connecting-n8n-to-backend.md` and compare the request shape with `backend/app/api/routes/workflows.py`.
