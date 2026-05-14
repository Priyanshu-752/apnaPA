from typing import Annotated

from fastapi import APIRouter, Depends, Header, HTTPException, status
from pydantic import BaseModel, Field

from backend.app.config.settings import Settings, get_settings
from backend.app.schemas.common import MessageResponse

router = APIRouter(prefix="/api/workflows", tags=["workflows"])


class ReminderTriggerRequest(BaseModel):
    user_id: str = Field(min_length=3)
    workflow_run_id: str = Field(min_length=3)
    channel: str = Field(min_length=2)


class DeliveryReportRequest(BaseModel):
    workflow_run_id: str = Field(min_length=3)
    status: str = Field(min_length=2)
    detail: str = Field(min_length=2)


def verify_workflow_secret(secret: str | None, settings: Settings) -> None:
    if secret != settings.n8n_webhook_secret:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid workflow secret.")


@router.post("/reminders/trigger", response_model=MessageResponse)
async def reminder_trigger(
    request: ReminderTriggerRequest,
    x_apnapa_secret: Annotated[str | None, Header()] = None,
    settings: Annotated[Settings, Depends(get_settings)] = None,
) -> MessageResponse:
    verify_workflow_secret(x_apnapa_secret, settings)
    return MessageResponse(
        message=(
            f"Workflow trigger accepted for {request.user_id} via {request.channel}. "
            "Domain reminder delivery will be implemented next."
        )
    )


@router.post("/delivery-report", response_model=MessageResponse)
async def delivery_report(
    request: DeliveryReportRequest,
    x_apnapa_secret: Annotated[str | None, Header()] = None,
    settings: Annotated[Settings, Depends(get_settings)] = None,
) -> MessageResponse:
    verify_workflow_secret(x_apnapa_secret, settings)
    return MessageResponse(
        message=f"Workflow delivery report accepted for run {request.workflow_run_id} with status {request.status}."
    )
