from pydantic import BaseModel, Field


class HealthLogRequest(BaseModel):
    meal: str = Field(min_length=2)
    calories: int = Field(ge=0)
    protein_grams: int = Field(ge=0)


class FinanceLogRequest(BaseModel):
    category: str = Field(min_length=2)
    amount: float = Field(gt=0)
    note: str = Field(min_length=2)


class ReminderRequest(BaseModel):
    title: str = Field(min_length=2)
    due_at: str = Field(min_length=4)


class GoalRequest(BaseModel):
    title: str = Field(min_length=2)
    target: str = Field(min_length=1)


class MemoryRequest(BaseModel):
    summary: str = Field(min_length=2)
    kind: str = Field(min_length=2)


class SettingsUpdateRequest(BaseModel):
    timezone: str = Field(min_length=3)
    ai_style: str = Field(min_length=8)
