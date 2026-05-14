from typing import Annotated
from uuid import uuid4

from fastapi import APIRouter, Depends

from backend.app.agents.orchestrator.service import OrchestratorService
from backend.app.api.dependencies import get_current_user
from backend.app.schemas.agent import AgentChatRequest, AgentChatResponse, ExecutionContext
from backend.app.schemas.auth import UserProfile

router = APIRouter(prefix="/api/agent", tags=["agent"])
_orchestrator = OrchestratorService()


@router.post("/chat", response_model=AgentChatResponse)
async def chat_with_agent(
    request: AgentChatRequest,
    current_user: Annotated[UserProfile, Depends(get_current_user)],
) -> AgentChatResponse:
    context = ExecutionContext(
        user_id=current_user.user_id,
        session_id=None,
        source=request.source,
        trace_id=str(uuid4()),
    )
    reply = _orchestrator.run(context, request.message)
    return AgentChatResponse(reply=reply)
