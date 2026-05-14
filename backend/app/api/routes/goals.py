from typing import Annotated

from fastapi import APIRouter, Depends

from backend.app.api.dependencies import get_current_user
from backend.app.schemas.auth import UserProfile
from backend.app.schemas.common import MessageResponse
from backend.app.schemas.domain import GoalRequest

router = APIRouter(prefix="/api/goals", tags=["goals"])


@router.get("/")
async def list_goals(
    current_user: Annotated[UserProfile, Depends(get_current_user)],
) -> dict[str, list[dict[str, str]]]:
    return {"user_id": current_user.user_id, "items": []}


@router.post("/", response_model=MessageResponse)
async def create_goal(
    request: GoalRequest,
    current_user: Annotated[UserProfile, Depends(get_current_user)],
) -> MessageResponse:
    return MessageResponse(message=f"Accepted goal draft '{request.title}' for {current_user.user_id}.")
