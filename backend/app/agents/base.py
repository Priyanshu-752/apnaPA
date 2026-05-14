from abc import ABC, abstractmethod

from backend.app.schemas.agent import AgentReply, ExecutionContext, Intent


class BaseAgent(ABC):
    name: str
    supported_intents: set[Intent]

    @abstractmethod
    def execute(self, context: ExecutionContext, message: str, intent: Intent) -> AgentReply:
        raise NotImplementedError
