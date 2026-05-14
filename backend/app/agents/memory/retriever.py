from backend.app.schemas.agent import ExecutionContext


class MemoryRetriever:
    def retrieve(self, context: ExecutionContext, message: str) -> list[str]:
        return [
            "User prefers concise summaries.",
            "User uses dashboard as the primary channel.",
        ]
