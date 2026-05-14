from typing import Annotated

from fastapi import APIRouter, Depends

from backend.app.api.dependencies import get_current_user
from backend.app.schemas.auth import UserProfile
from backend.app.schemas.common import MessageResponse
from backend.app.schemas.domain import ReminderRequest

router = APIRouter(prefix="/api/reminders", tags=["reminders"])


@router.get("/")
async def list_reminders(
    current_user: Annotated[UserProfile, Depends(get_current_user)],
) -> dict[str, list[dict[str, str]]]:
    return {"user_id": current_user.user_id, "items": []}


@router.post("/", response_model=MessageResponse)
async def create_reminder(
    request: ReminderRequest,
    current_user: Annotated[UserProfile, Depends(get_current_user)],
) -> MessageResponse:
    return MessageResponse(message=f"Accepted reminder draft '{request.title}' for {current_user.user_id}.")
