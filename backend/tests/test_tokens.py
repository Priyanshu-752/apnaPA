from backend.app.auth.sessions import InMemorySessionService
from backend.app.auth.tokens import create_access_token, decode_access_token
from backend.app.config.settings import get_settings
from backend.app.auth.firebase import VerifiedIdentity


def test_access_token_round_trip() -> None:
    settings = get_settings()
    token = create_access_token(user_id="user-1", session_id="session-1", settings=settings)
    payload = decode_access_token(token, settings)
    assert payload.sub == "user-1"
    assert payload.session_id == "session-1"


def test_session_service_hashes_and_rotates_refresh_token() -> None:
    service = InMemorySessionService(get_settings())
    session, refresh = service.create_session(
        VerifiedIdentity(subject="google:test", email="test@example.com", display_name="Test User")
    )
    rotated = service.rotate_refresh_token(refresh)
    assert rotated is not None
    rotated_session, next_refresh = rotated
    assert rotated_session.session_id == session.session_id
    assert next_refresh != refresh
