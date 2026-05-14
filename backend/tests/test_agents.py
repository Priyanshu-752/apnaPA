from backend.app.agents.orchestrator.service import OrchestratorService
from backend.app.schemas.agent import ExecutionContext, Intent


def test_registry_contains_health_and_finance_agents() -> None:
    orchestrator = OrchestratorService()
    assert orchestrator.registry.names() == ["finance-agent", "health-agent"]


def test_orchestrator_routes_meal_messages_to_health_agent() -> None:
    orchestrator = OrchestratorService()
    reply = orchestrator.run(ExecutionContext(user_id="user-1"), "log my lunch meal with 40g protein")
    assert reply.intent == Intent.LOG_MEAL
    assert reply.selected_agent == "health-agent"
    assert reply.requires_confirmation is True


def test_orchestrator_routes_expense_messages_to_finance_agent() -> None:
    orchestrator = OrchestratorService()
    reply = orchestrator.run(ExecutionContext(user_id="user-1"), "I spent 260 on transport")
    assert reply.intent == Intent.LOG_EXPENSE
    assert reply.selected_agent == "finance-agent"
    assert reply.proposals[0].requires_confirmation is True
