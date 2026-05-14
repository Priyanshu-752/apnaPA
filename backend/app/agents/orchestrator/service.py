from backend.app.agents.finance.agent import FinanceAgent
from backend.app.agents.health.agent import HealthAgent
from backend.app.agents.memory.retriever import MemoryRetriever
from backend.app.agents.registry import AgentRegistry
from backend.app.schemas.agent import AgentReply, ExecutionContext, Intent


class OrchestratorService:
    def __init__(self) -> None:
        self.registry = AgentRegistry()
        self.registry.register(HealthAgent())
        self.registry.register(FinanceAgent())
        self.memory = MemoryRetriever()

    def classify_intent(self, message: str) -> Intent:
        text = message.lower()
        if any(word in text for word in ("meal", "protein", "calorie", "breakfast", "lunch", "dinner")):
            return Intent.LOG_MEAL
        if any(word in text for word in ("expense", "spent", "budget", "saving", "income")):
            return Intent.LOG_EXPENSE
        if "health summary" in text:
            return Intent.ASK_HEALTH_SUMMARY
        if "finance summary" in text:
            return Intent.ASK_FINANCE_SUMMARY
        if "remind" in text:
            return Intent.SET_REMINDER
        if "goal" in text:
            return Intent.SET_GOAL
        if any(word in text for word in ("preference", "timezone", "style")):
            return Intent.UPDATE_PREFERENCES
        if len(text.strip()) < 4:
            return Intent.UNKNOWN_OR_NEEDS_CLARIFICATION
        return Intent.GENERAL_CONVERSATION

    def run(self, context: ExecutionContext, message: str) -> AgentReply:
        context.memories = self.memory.retrieve(context, message)
        intent = self.classify_intent(message)
        agent = self.registry.get_for_intent(intent)
        if agent is not None:
            return agent.execute(context, message, intent)
        if intent == Intent.SET_REMINDER:
            return AgentReply(
                text="Reminder stub: I can prepare a reminder proposal, but this backend slice stops before persistence.",
                intent=intent,
                requires_confirmation=True,
                missing_fields=["due_at"],
                selected_agent="orchestrator",
            )
        if intent == Intent.SET_GOAL:
            return AgentReply(
                text="Goal stub: I can help define a target and timeframe, then ask for confirmation before saving.",
                intent=intent,
                requires_confirmation=True,
                missing_fields=["target", "timeframe"],
                selected_agent="orchestrator",
            )
        if intent == Intent.UPDATE_PREFERENCES:
            return AgentReply(
                text="Preference stub: I can prepare profile changes, but they should still go through confirmation and validation.",
                intent=intent,
                requires_confirmation=True,
                selected_agent="orchestrator",
            )
        if intent == Intent.UNKNOWN_OR_NEEDS_CLARIFICATION:
            return AgentReply(
                text="I need a little more detail before I can route that safely.",
                intent=intent,
                requires_confirmation=False,
                selected_agent="orchestrator",
            )
        return AgentReply(
            text="General conversation stub: the orchestrator is live, but rich AI reasoning comes after the contract and tool layers.",
            intent=intent,
            requires_confirmation=False,
            selected_agent="orchestrator",
        )
