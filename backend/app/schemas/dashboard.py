from pydantic import BaseModel


class DashboardOverviewResponse(BaseModel):
    today_label: str
    health_summary: str
    finance_summary: str
    reminder_summary: str


class ActivityItem(BaseModel):
    title: str
    meta: str


class DashboardInsightsResponse(BaseModel):
    insights: list[str]
