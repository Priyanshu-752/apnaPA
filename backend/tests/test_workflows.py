from fastapi.testclient import TestClient

from backend.app.main import app
from backend.app.config.settings import get_settings


client = TestClient(app)


def test_workflow_trigger_requires_secret() -> None:
    response = client.post(
        "/api/workflows/reminders/trigger",
        json={"user_id": "user-1", "workflow_run_id": "run-1", "channel": "telegram"},
    )
    assert response.status_code == 401


def test_workflow_trigger_accepts_valid_secret() -> None:
    response = client.post(
        "/api/workflows/reminders/trigger",
        headers={"x-apnapa-secret": get_settings().n8n_webhook_secret},
        json={"user_id": "user-1", "workflow_run_id": "run-1", "channel": "telegram"},
    )
    assert response.status_code == 200
    assert "Workflow trigger accepted" in response.json()["message"]
