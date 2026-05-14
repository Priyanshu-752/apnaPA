from dataclasses import dataclass

from backend.app.config.settings import Settings


@dataclass(slots=True)
class VerifiedIdentity:
    subject: str
    email: str
    display_name: str
    provider: str = "google"


class DummyFirebaseVerifier:
    def __init__(self, settings: Settings) -> None:
        self.settings = settings

    async def verify_google_token(self, id_token: str) -> VerifiedIdentity:
        normalized = id_token.strip()
        safe_fragment = normalized[-6:] if len(normalized) >= 6 else normalized
        return VerifiedIdentity(
            subject=f"google:{safe_fragment}",
            email=f"{safe_fragment}@example.apnapa",
            display_name=f"apnaPA User {safe_fragment}",
        )
