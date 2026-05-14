from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, status

from backend.app.api.dependencies import get_current_user, get_session_service
from backend.app.auth.firebase import DummyFirebaseVerifier
from backend.app.auth.sessions import InMemorySessionService
from backend.app.auth.tokens import create_access_token
from backend.app.config.settings import Settings, get_settings
from backend.app.schemas.auth import AuthGoogleRequest, RefreshTokenRequest, SessionResponse, UserProfile

router = APIRouter(prefix="/api/auth", tags=["auth"])


def get_verifier() -> DummyFirebaseVerifier:
    return DummyFirebaseVerifier(get_settings())


@router.post("/google", response_model=SessionResponse)
async def exchange_google_token(
    request: AuthGoogleRequest,
    sessions: Annotated[InMemorySessionService, Depends(get_session_service)],
    settings: Annotated[Settings, Depends(get_settings)],
) -> SessionResponse:
    identity = await get_verifier().verify_google_token(request.id_token)
    session, refresh_token = sessions.create_session(identity)
    access_token = create_access_token(user_id=session.user.user_id, session_id=session.session_id, settings=settings)
    return SessionResponse(
        user=session.user,
        tokens=sessions.create_token_bundle(session, refresh_token, access_token),
    )


@router.post("/refresh", response_model=SessionResponse)
async def refresh_session(
    request: RefreshTokenRequest,
    sessions: Annotated[InMemorySessionService, Depends(get_session_service)],
    settings: Annotated[Settings, Depends(get_settings)],
) -> SessionResponse:
    rotated = sessions.rotate_refresh_token(request.refresh_token)
    if rotated is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Refresh token is invalid.")
    session, next_refresh = rotated
    access_token = create_access_token(user_id=session.user.user_id, session_id=session.session_id, settings=settings)
    return SessionResponse(
        user=session.user,
        tokens=sessions.create_token_bundle(session, next_refresh, access_token),
    )


@router.post("/logout")
async def logout(
    request: RefreshTokenRequest,
    sessions: Annotated[InMemorySessionService, Depends(get_session_service)],
) -> dict[str, str]:
    if not sessions.revoke_session(request.refresh_token):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Session not found.")
    return {"message": "Logged out."}


@router.get("/me", response_model=UserProfile)
async def get_me(current_user: Annotated[UserProfile, Depends(get_current_user)]) -> UserProfile:
    return current_user
