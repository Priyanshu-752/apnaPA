from typing import Annotated

from fastapi import APIRouter, Depends

from backend.app.api.dependencies import get_current_user
from backend.app.schemas.auth import UserProfile
from backend.app.schemas.common import MessageResponse
from backend.app.schemas.domain import HealthLogRequest

router = APIRouter(prefix="/api/health", tags=["health"])


@router.get("/summary")
async def health_summary(
    current_user: Annotated[UserProfile, Depends(get_current_user)],
) -> dict[str, str]:
    return {
        "user_id": current_user.user_id,
        "summary": "Health summary placeholder backed by domain services later.",
    }


@router.post("/logs", response_model=MessageResponse)
async def create_health_log(
    request: HealthLogRequest,
    current_user: Annotated[UserProfile, Depends(get_current_user)],
) -> MessageResponse:
    return MessageResponse(message=f"Accepted health log draft '{request.meal}' for {current_user.user_id}.")
