from fastapi import APIRouter, FastAPI

from backend.app.api.routes import (
    admin,
    agent,
    auth,
    conversation,
    dashboard,
    finance,
    goals,
    health,
    memory,
    notifications,
    onboarding,
    reminders,
    settings,
    telegram,
    workflows,
)


def build_api_router() -> APIRouter:
    router = APIRouter()
    for child_router in (
        admin.router,
        auth.router,
        onboarding.router,
        telegram.router,
        agent.router,
        conversation.router,
        dashboard.router,
        health.router,
        finance.router,
        reminders.router,
        goals.router,
        memory.router,
        settings.router,
        notifications.router,
        workflows.router,
    ):
        router.include_router(child_router)
    return router


def register_routes(app: FastAPI) -> None:
    app.include_router(build_api_router())
