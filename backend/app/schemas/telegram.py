from pydantic import BaseModel


class TelegramLinkTokenResponse(BaseModel):
    link_token: str
    expires_in_minutes: int


class TelegramLinkStatusResponse(BaseModel):
    linked: bool
    handle: str | None = None
