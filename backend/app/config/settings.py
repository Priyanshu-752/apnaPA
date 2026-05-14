from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "apnaPA Backend"
    environment: str = "development"
    api_prefix: str = "/api"
    secret_key: str = "change-me-in-production-please-use-32-plus-bytes"
    database_url: str = "postgresql+asyncpg://postgres:postgres@localhost:5432/apnapa"
    access_token_expiry_minutes: int = 30
    refresh_token_expiry_days: int = 14
    dummy_google_audience: str = "apnapa-dashboard"
    firebase_project_id: str = "replace-me"
    firebase_client_email: str = "replace-me@replace-me.iam.gserviceaccount.com"
    firebase_private_key: str = "replace-me"
    telegram_bot_token: str = "replace-me"
    telegram_bot_username: str = "replace-me_bot"
    openai_api_key: str = "replace-me"
    openai_model: str = "gpt-4.1-mini"
    qdrant_url: str = "http://localhost:6333"
    qdrant_api_key: str = "replace-me"
    redis_url: str = "redis://localhost:6379/0"
    n8n_webhook_secret: str = "local-n8n-secret"
    n8n_base_url: str = "http://localhost:5678"
    default_timezone: str = "Asia/Kolkata"
    default_ai_style: str = "Concise, supportive, and confirmation-first."
    model_config = SettingsConfigDict(
        env_prefix="APP_",
        env_file=("backend/.env", ".env"),
        env_file_encoding="utf-8",
        case_sensitive=False,
        extra="ignore",
    )


@lru_cache(maxsize=1)
def get_settings() -> Settings:
    return Settings()
