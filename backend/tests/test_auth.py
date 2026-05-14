from fastapi.testclient import TestClient

from backend.app.main import app


client = TestClient(app)


def create_session() -> dict:
    response = client.post("/api/auth/google", json={"id_token": "demo-google-token"})
    assert response.status_code == 200
    return response.json()


def test_google_exchange_returns_session_and_tokens() -> None:
    payload = create_session()
    assert payload["user"]["auth_provider"] == "google"
    assert payload["tokens"]["token_type"] == "bearer"
    assert payload["tokens"]["refresh_token"]


def test_me_requires_bearer_token_and_returns_current_user() -> None:
    payload = create_session()
    access_token = payload["tokens"]["access_token"]
    response = client.get("/api/auth/me", headers={"Authorization": f"Bearer {access_token}"})
    assert response.status_code == 200
    assert response.json()["user_id"] == payload["user"]["user_id"]


def test_refresh_rotates_refresh_token() -> None:
    payload = create_session()
    refresh_response = client.post("/api/auth/refresh", json={"refresh_token": payload["tokens"]["refresh_token"]})
    assert refresh_response.status_code == 200
    refreshed = refresh_response.json()
    assert refreshed["tokens"]["refresh_token"] != payload["tokens"]["refresh_token"]
