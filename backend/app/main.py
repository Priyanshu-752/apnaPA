from fastapi import FastAPI

from backend.app.api.routes import register_routes
from backend.app.config.settings import get_settings


def create_app() -> FastAPI:
    settings = get_settings()
    app = FastAPI(
        title=settings.app_name,
        version="0.1.0",
        description="FastAPI backend scaffold for apnaPA.",
    )
    register_routes(app)
    return app


app = create_app()
