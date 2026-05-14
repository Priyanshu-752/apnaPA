from typing import Annotated

from fastapi import APIRouter, Depends

from backend.app.api.dependencies import get_current_user
from backend.app.schemas.auth import UserProfile
from backend.app.schemas.dashboard import ActivityItem, DashboardInsightsResponse, DashboardOverviewResponse

router = APIRouter(prefix="/api/dashboard", tags=["dashboard"])


@router.get("/overview", response_model=DashboardOverviewResponse)
async def dashboard_overview(
    current_user: Annotated[UserProfile, Depends(get_current_user)],
) -> DashboardOverviewResponse:
    return DashboardOverviewResponse(
        today_label="Today",
        health_summary=f"Health dashboard placeholder for {current_user.display_name}.",
        finance_summary="Finance dashboard placeholder with budgets and trends later.",
        reminder_summary="Reminder dashboard placeholder with upcoming queue later.",
    )


@router.get("/activity", response_model=list[ActivityItem])
async def dashboard_activity(
    current_user: Annotated[UserProfile, Depends(get_current_user)],
) -> list[ActivityItem]:
    return [
        ActivityItem(title="Backend scaffold booted", meta=current_user.user_id),
        ActivityItem(title="Auth session contract ready", meta="dummy-first"),
    ]


@router.get("/insights", response_model=DashboardInsightsResponse)
async def dashboard_insights(
    current_user: Annotated[UserProfile, Depends(get_current_user)],
) -> DashboardInsightsResponse:
    return DashboardInsightsResponse(
        insights=[
            f"Dashboard insights will later be scoped to {current_user.user_id}.",
            "Agent suggestions will be derived from domain services and events.",
        ]
    )
