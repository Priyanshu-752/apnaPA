from typing import Annotated

from fastapi import APIRouter, Depends

from backend.app.api.dependencies import get_current_user
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
) -> dict[str, str]:
    return {
        "user_id": current_user.user_id,
        "message": f"Validated profile update for timezone={request.timezone}.",
    }
