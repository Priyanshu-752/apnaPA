from backend.app.agents.base import BaseAgent
from backend.app.schemas.agent import AgentReply, ExecutionContext, Intent, ToolProposal


class HealthAgent(BaseAgent):
    name = "health-agent"
    supported_intents = {Intent.LOG_MEAL, Intent.ASK_HEALTH_SUMMARY}

    def execute(self, context: ExecutionContext, message: str, intent: Intent) -> AgentReply:
        if intent == Intent.LOG_MEAL:
            return AgentReply(
                text="I can prepare this as a health log, but I need your confirmation before saving it.",
                intent=intent,
                requires_confirmation=True,
                proposals=[
                    ToolProposal(
                        tool_name="save_health_log",
                        requires_confirmation=True,
                        payload={"raw_message": message, "user_id": context.user_id},
                    )
                ],
                selected_agent=self.name,
            )
        return AgentReply(
            text="Health summary stub: this will later combine meals, goals, hydration, and daily patterns.",
            intent=intent,
            requires_confirmation=False,
            selected_agent=self.name,
        )
