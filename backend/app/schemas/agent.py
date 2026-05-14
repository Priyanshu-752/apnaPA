from enum import Enum
from typing import Any

from pydantic import BaseModel, Field


class Intent(str, Enum):
    LOG_MEAL = "log_meal"
    LOG_EXPENSE = "log_expense"
    ASK_HEALTH_SUMMARY = "ask_health_summary"
    ASK_FINANCE_SUMMARY = "ask_finance_summary"
    SET_GOAL = "set_goal"
    SET_REMINDER = "set_reminder"
    UPDATE_PREFERENCES = "update_preferences"
    GENERAL_CONVERSATION = "general_conversation"
    UNKNOWN_OR_NEEDS_CLARIFICATION = "unknown_or_needs_clarification"


class ExecutionContext(BaseModel):
    user_id: str
    session_id: str | None = None
    source: str = "dashboard"
    trace_id: str | None = None
    memories: list[str] = Field(default_factory=list)
    permissions: list[str] = Field(default_factory=lambda: ["read", "propose_write"])
    token_budget: int = 2048


class ToolProposal(BaseModel):
    tool_name: str
    requires_confirmation: bool
    payload: dict[str, Any] = Field(default_factory=dict)


class AgentReply(BaseModel):
    text: str
    intent: Intent
    requires_confirmation: bool
    proposals: list[ToolProposal] = Field(default_factory=list)
    missing_fields: list[str] = Field(default_factory=list)
    selected_agent: str


class AgentChatRequest(BaseModel):
    message: str = Field(min_length=1, max_length=600)
    source: str = "dashboard"


class AgentChatResponse(BaseModel):
    reply: AgentReply
