from typing import Annotated

from fastapi import APIRouter, Depends

from backend.app.api.dependencies import get_current_user
from backend.app.schemas.auth import UserProfile
from backend.app.schemas.common import MessageResponse

router = APIRouter(prefix="/api/conversation", tags=["conversation"])


@router.post("/message", response_model=MessageResponse)
async def save_message(
    current_user: Annotated[UserProfile, Depends(get_current_user)],
) -> MessageResponse:
    return MessageResponse(message=f"Conversation message placeholder saved for {current_user.user_id}.")


@router.post("/voice", response_model=MessageResponse)
async def save_voice_message(
    current_user: Annotated[UserProfile, Depends(get_current_user)],
) -> MessageResponse:
    return MessageResponse(message=f"Voice conversation placeholder saved for {current_user.user_id}.")


@router.get("/history")
async def get_history(
    current_user: Annotated[UserProfile, Depends(get_current_user)],
) -> dict[str, list[dict[str, str]]]:
    return {"user_id": current_user.user_id, "messages": []}
