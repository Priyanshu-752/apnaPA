from typing import Annotated

from fastapi import APIRouter, Depends

from backend.app.config.settings import Settings
from backend.app.database.session import DatabaseSessionPlaceholder, get_db_session
from backend.app.config.settings import get_settings
from backend.app.schemas.common import HealthResponse

router = APIRouter(prefix="/api/admin", tags=["admin"])


@router.get("/health", response_model=HealthResponse)
async def admin_health(
    settings: Annotated[Settings, Depends(get_settings)],
    database: Annotated[DatabaseSessionPlaceholder, Depends(get_db_session)],
) -> HealthResponse:
    return HealthResponse(status="ok", environment=settings.environment, database=database.backend)
