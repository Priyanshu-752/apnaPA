from datetime import UTC, datetime, timedelta

import jwt
from pydantic import BaseModel

from backend.app.config.settings import Settings


class AccessTokenPayload(BaseModel):
    sub: str
    session_id: str
    exp: int


def create_access_token(*, user_id: str, session_id: str, settings: Settings) -> str:
    expires_at = datetime.now(UTC) + timedelta(minutes=settings.access_token_expiry_minutes)
    payload = {
        "sub": user_id,
        "session_id": session_id,
        "exp": int(expires_at.timestamp()),
    }
    return jwt.encode(payload, settings.secret_key, algorithm="HS256")


def decode_access_token(token: str, settings: Settings) -> AccessTokenPayload:
    payload = jwt.decode(token, settings.secret_key, algorithms=["HS256"])
    return AccessTokenPayload.model_validate(payload)
