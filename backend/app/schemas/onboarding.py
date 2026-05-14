from pydantic import BaseModel, Field


class OnboardingStatusResponse(BaseModel):
    completed: bool
    current_step: str


class OnboardingStepRequest(BaseModel):
    step: str = Field(min_length=2)
    payload: dict[str, str] = Field(default_factory=dict)
