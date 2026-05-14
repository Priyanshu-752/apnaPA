from dataclasses import dataclass


@dataclass(slots=True)
class DatabaseSessionPlaceholder:
    connected: bool = True
    backend: str = "placeholder"


async def get_db_session() -> DatabaseSessionPlaceholder:
    return DatabaseSessionPlaceholder()
