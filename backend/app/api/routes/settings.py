from typing import Annotated

from fastapi import APIRouter, Depends

from backend.app.api.dependencies import get_current_user, get_session_service
from backend.app.auth.sessions import InMemorySessionService
from backend.app.schemas.auth import UserProfile
from backend.app.schemas.domain import SettingsUpdateRequest

router = APIRouter(prefix="/api/settings", tags=["settings"])


@router.get("/profile", response_model=UserProfile)
async def get_profile(
    current_user: Annotated[UserProfile, Depends(get_current_user)],
) -> UserProfile:
    return current_user


@router.patch("/profile")
async def update_profile(
    request: SettingsUpdateRequest,
    current_user: Annotated[UserProfile, Depends(get_current_user)],
    sessions: Annotated[InMemorySessionService, Depends(get_session_service)],
) -> dict[str, str | UserProfile]:
    updated = sessions.update_user_profile(
        current_user.user_id,
        timezone=request.timezone,
        ai_style=request.ai_style,
    )
    return {
        "message": "Profile updated successfully.",
        "user": updated or current_user,
    }
