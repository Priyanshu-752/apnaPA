from pydantic import BaseModel, Field


class AuthGoogleRequest(BaseModel):
    id_token: str = Field(min_length=8)


class RefreshTokenRequest(BaseModel):
    refresh_token: str = Field(min_length=16)


class UserProfile(BaseModel):
    user_id: str
    email: str
    display_name: str
    auth_provider: str
    timezone: str
    ai_style: str
    onboarding_complete: bool
    telegram_linked: bool


class TokenBundle(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"
    expires_in_seconds: int


class SessionResponse(BaseModel):
    message: str | None = None
    user: UserProfile
    tokens: TokenBundle
