from dataclasses import dataclass
from datetime import UTC, datetime, timedelta
from hashlib import sha256
from secrets import token_urlsafe

from backend.app.auth.firebase import VerifiedIdentity
from backend.app.config.settings import Settings
from backend.app.schemas.auth import TokenBundle, UserProfile


@dataclass(slots=True)
class SessionRecord:
    session_id: str
    user: UserProfile
    refresh_token_hash: str
    expires_at: datetime
    created_at: datetime


class InMemorySessionService:
    def __init__(self, settings: Settings) -> None:
        self.settings = settings
        self._sessions: dict[str, SessionRecord] = {}

    def _hash_refresh_token(self, refresh_token: str) -> str:
        return sha256(refresh_token.encode("utf-8")).hexdigest()

    def _build_user(self, identity: VerifiedIdentity) -> UserProfile:
        return UserProfile(
            user_id=identity.subject,
            email=identity.email,
            display_name=identity.display_name,
            auth_provider=identity.provider,
            timezone=self.settings.default_timezone,
            ai_style=self.settings.default_ai_style,
            onboarding_complete=False,
            telegram_linked=False,
        )

    def create_session(self, identity: VerifiedIdentity) -> tuple[SessionRecord, str]:
        refresh_token = token_urlsafe(32)
        session_id = token_urlsafe(12)
        now = datetime.now(UTC)
        record = SessionRecord(
            session_id=session_id,
            user=self._build_user(identity),
            refresh_token_hash=self._hash_refresh_token(refresh_token),
            expires_at=now + timedelta(days=self.settings.refresh_token_expiry_days),
            created_at=now,
        )
        self._sessions[session_id] = record
        return record, refresh_token

    def create_token_bundle(self, session: SessionRecord, refresh_token: str, access_token: str) -> TokenBundle:
        return TokenBundle(
            access_token=access_token,
            refresh_token=refresh_token,
            expires_in_seconds=self.settings.access_token_expiry_minutes * 60,
        )

    def get_user(self, session_id: str) -> UserProfile | None:
        record = self._sessions.get(session_id)
        if record is None:
            return None
        if record.expires_at <= datetime.now(UTC):
            self._sessions.pop(session_id, None)
            return None
        return record.user

    def _find_session_by_user_id(self, user_id: str) -> tuple[str, SessionRecord] | None:
        for session_id, record in self._sessions.items():
            if record.user.user_id == user_id:
                return session_id, record
        return None

    def update_user_profile(self, user_id: str, *, timezone: str, ai_style: str) -> UserProfile | None:
        match = self._find_session_by_user_id(user_id)
        if match is None:
            return None
        session_id, record = match
        user = record.user.model_copy(update={"timezone": timezone, "ai_style": ai_style})
        self._sessions[session_id] = SessionRecord(
            session_id=record.session_id,
            user=user,
            refresh_token_hash=record.refresh_token_hash,
            expires_at=record.expires_at,
            created_at=record.created_at,
        )
        return user

    def mark_onboarding_complete(self, user_id: str) -> UserProfile | None:
        match = self._find_session_by_user_id(user_id)
        if match is None:
            return None
        session_id, record = match
        user = record.user.model_copy(update={"onboarding_complete": True})
        self._sessions[session_id] = SessionRecord(
            session_id=record.session_id,
            user=user,
            refresh_token_hash=record.refresh_token_hash,
            expires_at=record.expires_at,
            created_at=record.created_at,
        )
        return user

    def set_telegram_linked(self, user_id: str, *, linked: bool) -> UserProfile | None:
        match = self._find_session_by_user_id(user_id)
        if match is None:
            return None
        session_id, record = match
        user = record.user.model_copy(update={"telegram_linked": linked})
        self._sessions[session_id] = SessionRecord(
            session_id=record.session_id,
            user=user,
            refresh_token_hash=record.refresh_token_hash,
            expires_at=record.expires_at,
            created_at=record.created_at,
        )
        return user

    def rotate_refresh_token(self, refresh_token: str) -> tuple[SessionRecord, str] | None:
        refresh_hash = self._hash_refresh_token(refresh_token)
        for session_id, record in self._sessions.items():
            if record.refresh_token_hash != refresh_hash:
                continue
            if record.expires_at <= datetime.now(UTC):
                self._sessions.pop(session_id, None)
                return None
            next_refresh = token_urlsafe(32)
            self._sessions[session_id] = SessionRecord(
                session_id=record.session_id,
                user=record.user,
                refresh_token_hash=self._hash_refresh_token(next_refresh),
                expires_at=record.expires_at,
                created_at=record.created_at,
            )
            return self._sessions[session_id], next_refresh
        return None

    def revoke_session(self, refresh_token: str) -> bool:
        refresh_hash = self._hash_refresh_token(refresh_token)
        for session_id, record in list(self._sessions.items()):
            if record.refresh_token_hash == refresh_hash:
                self._sessions.pop(session_id, None)
                return True
        return False
