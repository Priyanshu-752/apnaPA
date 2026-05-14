from typing import Annotated

from fastapi import Depends, Header, HTTPException, status

from backend.app.auth.sessions import InMemorySessionService
from backend.app.auth.tokens import AccessTokenPayload, decode_access_token
from backend.app.config.settings import Settings, get_settings
from backend.app.schemas.auth import UserProfile

_session_service: InMemorySessionService | None = None


def get_settings_dependency() -> Settings:
    return get_settings()


def get_session_service(
    settings: Annotated[Settings, Depends(get_settings_dependency)],
) -> InMemorySessionService:
    global _session_service
    if _session_service is None:
        _session_service = InMemorySessionService(settings)
    return _session_service


def parse_bearer_token(authorization: str | None) -> str:
    if authorization is None or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Missing bearer token.")
    return authorization.removeprefix("Bearer ").strip()


def get_token_payload(
    authorization: Annotated[str | None, Header()] = None,
    settings: Annotated[Settings, Depends(get_settings_dependency)] = None,
) -> AccessTokenPayload:
    token = parse_bearer_token(authorization)
    try:
        return decode_access_token(token, settings)
    except Exception as exc:  # pragma: no cover - protects route boundary
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid access token.") from exc


def get_current_user(
    payload: Annotated[AccessTokenPayload, Depends(get_token_payload)],
    sessions: Annotated[InMemorySessionService, Depends(get_session_service)],
) -> UserProfile:
    user = sessions.get_user(payload.session_id)
    if user is None or user.user_id != payload.sub:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Session not found.")
    return user
