from typing import Annotated

from fastapi import APIRouter, Depends

from backend.app.api.dependencies import get_current_user
from backend.app.schemas.auth import UserProfile
from backend.app.schemas.common import MessageResponse

router = APIRouter(prefix="/api/notifications", tags=["notifications"])


@router.get("/")
async def list_notifications(
    current_user: Annotated[UserProfile, Depends(get_current_user)],
) -> dict[str, list[dict[str, str]]]:
    return {"user_id": current_user.user_id, "items": []}


@router.post("/test", response_model=MessageResponse)
async def trigger_test_notification(
    current_user: Annotated[UserProfile, Depends(get_current_user)],
) -> MessageResponse:
    return MessageResponse(message=f"Notification test placeholder accepted for {current_user.user_id}.")
