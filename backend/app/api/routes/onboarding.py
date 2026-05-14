from typing import Annotated

from fastapi import APIRouter, Depends

from backend.app.api.dependencies import get_current_user
from backend.app.schemas.auth import UserProfile
from backend.app.schemas.common import MessageResponse
from backend.app.schemas.onboarding import OnboardingStatusResponse, OnboardingStepRequest

router = APIRouter(prefix="/api/onboarding", tags=["onboarding"])


@router.get("/status", response_model=OnboardingStatusResponse)
async def onboarding_status(
    current_user: Annotated[UserProfile, Depends(get_current_user)],
) -> OnboardingStatusResponse:
    return OnboardingStatusResponse(
        completed=current_user.onboarding_complete,
        current_step="profile_basics" if not current_user.onboarding_complete else "done",
    )


@router.post("/step", response_model=MessageResponse)
async def save_onboarding_step(
    request: OnboardingStepRequest,
    current_user: Annotated[UserProfile, Depends(get_current_user)],
) -> MessageResponse:
    return MessageResponse(message=f"Stored step '{request.step}' for {current_user.user_id}.")


@router.post("/complete", response_model=MessageResponse)
async def complete_onboarding(
    current_user: Annotated[UserProfile, Depends(get_current_user)],
) -> MessageResponse:
    return MessageResponse(message=f"Onboarding completion acknowledged for {current_user.user_id}.")


@router.get("/recommendations")
async def onboarding_recommendations(
    current_user: Annotated[UserProfile, Depends(get_current_user)],
) -> dict[str, list[str]]:
    return {
        "user_id": current_user.user_id,
        "recommendations": [
            "Set one health goal for the week.",
            "Create one default reminder channel.",
            "Review finance categories before automation starts.",
        ],
    }
