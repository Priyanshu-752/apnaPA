from secrets import token_urlsafe
from typing import Annotated

from fastapi import APIRouter, Depends, Header, HTTPException, status

from backend.app.api.dependencies import get_current_user, get_session_service
from backend.app.auth.sessions import InMemorySessionService
from backend.app.config.settings import Settings, get_settings
from backend.app.schemas.auth import UserProfile
from backend.app.schemas.common import MessageResponse
from backend.app.schemas.telegram import TelegramLinkStatusResponse, TelegramLinkTokenResponse

router = APIRouter(prefix="/api/telegram", tags=["telegram"])


@router.get("/link-token", response_model=TelegramLinkTokenResponse)
async def create_link_token(
    current_user: Annotated[UserProfile, Depends(get_current_user)],
) -> TelegramLinkTokenResponse:
    return TelegramLinkTokenResponse(link_token=f"{current_user.user_id}.{token_urlsafe(12)}", expires_in_minutes=15)


@router.post("/link/confirm", response_model=MessageResponse)
async def confirm_link(
    current_user: Annotated[UserProfile, Depends(get_current_user)],
    sessions: Annotated[InMemorySessionService, Depends(get_session_service)],
) -> MessageResponse:
    sessions.set_telegram_linked(current_user.user_id, linked=True)
    return MessageResponse(message="Telegram connected successfully.")


@router.post("/unlink", response_model=MessageResponse)
async def unlink_telegram(
    current_user: Annotated[UserProfile, Depends(get_current_user)],
    sessions: Annotated[InMemorySessionService, Depends(get_session_service)],
) -> MessageResponse:
    sessions.set_telegram_linked(current_user.user_id, linked=False)
    return MessageResponse(message="Telegram disconnected successfully.")


@router.get("/link/status", response_model=TelegramLinkStatusResponse)
async def link_status(
    current_user: Annotated[UserProfile, Depends(get_current_user)],
) -> TelegramLinkStatusResponse:
    return TelegramLinkStatusResponse(linked=current_user.telegram_linked, handle=None)


@router.post("/webhook", response_model=MessageResponse)
async def telegram_webhook(
    x_apnapa_secret: Annotated[str | None, Header()] = None,
    settings: Annotated[Settings, Depends(get_settings)] = None,
) -> MessageResponse:
    if x_apnapa_secret != settings.n8n_webhook_secret:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid webhook secret.")
    return MessageResponse(message="Telegram webhook placeholder accepted.")
