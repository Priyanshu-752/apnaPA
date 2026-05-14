from backend.app.agents.base import BaseAgent
from backend.app.schemas.agent import Intent


class AgentRegistry:
    def __init__(self) -> None:
        self._agents: dict[str, BaseAgent] = {}

    def register(self, agent: BaseAgent) -> None:
        self._agents[agent.name] = agent

    def get_for_intent(self, intent: Intent) -> BaseAgent | None:
        for agent in self._agents.values():
            if intent in agent.supported_intents:
                return agent
        return None

    def names(self) -> list[str]:
        return sorted(self._agents)
