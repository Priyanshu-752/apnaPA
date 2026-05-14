from typing import Annotated

from fastapi import APIRouter, Depends, Query

from backend.app.api.dependencies import get_current_user
from backend.app.schemas.auth import UserProfile
from backend.app.schemas.common import MessageResponse
from backend.app.schemas.domain import MemoryRequest

router = APIRouter(prefix="/api/memory", tags=["memory"])


@router.get("/search")
async def search_memory(
    current_user: Annotated[UserProfile, Depends(get_current_user)],
    q: str = Query(default=""),
) -> dict[str, list[dict[str, str]]]:
    return {"user_id": current_user.user_id, "items": [{"query": q, "summary": "Memory search placeholder."}] if q else []}


@router.get("/recent")
async def recent_memory(
    current_user: Annotated[UserProfile, Depends(get_current_user)],
) -> dict[str, list[dict[str, str]]]:
    return {"user_id": current_user.user_id, "items": []}


@router.post("/", response_model=MessageResponse)
async def create_memory(
    request: MemoryRequest,
    current_user: Annotated[UserProfile, Depends(get_current_user)],
) -> MessageResponse:
    return MessageResponse(message=f"Accepted memory draft '{request.summary}' for {current_user.user_id}.")
