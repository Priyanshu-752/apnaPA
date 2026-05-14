from backend.app.agents.base import BaseAgent
from backend.app.schemas.agent import AgentReply, ExecutionContext, Intent, ToolProposal


class FinanceAgent(BaseAgent):
    name = "finance-agent"
    supported_intents = {Intent.LOG_EXPENSE, Intent.ASK_FINANCE_SUMMARY}

    def execute(self, context: ExecutionContext, message: str, intent: Intent) -> AgentReply:
        if intent == Intent.LOG_EXPENSE:
            return AgentReply(
                text="I can turn that into an expense proposal, then wait for your confirmation before any write.",
                intent=intent,
                requires_confirmation=True,
                proposals=[
                    ToolProposal(
                        tool_name="save_finance_log",
                        requires_confirmation=True,
                        payload={"raw_message": message, "user_id": context.user_id},
                    )
                ],
                selected_agent=self.name,
            )
        return AgentReply(
            text="Finance summary stub: this will later combine spend, budgets, goals, and savings trends.",
            intent=intent,
            requires_confirmation=False,
            selected_agent=self.name,
        )
