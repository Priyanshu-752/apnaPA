from typing import Annotated

from fastapi import APIRouter, Depends

from backend.app.api.dependencies import get_current_user
from backend.app.schemas.auth import UserProfile
from backend.app.schemas.common import MessageResponse
from backend.app.schemas.domain import FinanceLogRequest

router = APIRouter(prefix="/api/finance", tags=["finance"])


@router.get("/summary")
async def finance_summary(
    current_user: Annotated[UserProfile, Depends(get_current_user)],
) -> dict[str, str]:
    return {
        "user_id": current_user.user_id,
        "summary": "Finance summary placeholder backed by budgets and categories later.",
    }


@router.post("/logs", response_model=MessageResponse)
async def create_finance_log(
    request: FinanceLogRequest,
    current_user: Annotated[UserProfile, Depends(get_current_user)],
) -> MessageResponse:
    return MessageResponse(message=f"Accepted finance log draft '{request.note}' for {current_user.user_id}.")
