from fastapi.testclient import TestClient

from backend.app.main import app


client = TestClient(app)


def test_health_route_reports_boot_state() -> None:
    response = client.get("/api/admin/health")
    assert response.status_code == 200
    body = response.json()
    assert body["status"] == "ok"
    assert "environment" in body


def test_all_major_route_groups_are_registered() -> None:
    routes = {route.path for route in app.routes}
    for path in (
        "/api/admin/health",
        "/api/auth/google",
        "/api/onboarding/status",
        "/api/telegram/link-token",
        "/api/agent/chat",
        "/api/dashboard/overview",
        "/api/health/summary",
        "/api/finance/summary",
        "/api/reminders/",
        "/api/goals/",
        "/api/memory/recent",
        "/api/settings/profile",
        "/api/notifications/",
        "/api/workflows/reminders/trigger",
    ):
        assert path in routes
