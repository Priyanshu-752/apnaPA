import { NextResponse } from "next/server";
import { createErrorResponse, fetchBackendJson } from "@/lib/backend-route";

type BackendAgentResponse = {
  reply: {
    text: string;
    intent: string;
    requires_confirmation: boolean;
    selected_agent: string;
    missing_fields: string[];
  };
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { message?: string; source?: string };
    const payload = await fetchBackendJson<BackendAgentResponse>("/api/agent/chat", {
      method: "POST",
      body: JSON.stringify({
        message: body.message,
        source: body.source ?? "dashboard",
      }),
    });
    return NextResponse.json({
      reply: {
        text: payload.reply.text,
        intent: payload.reply.intent,
        requiresConfirmation: payload.reply.requires_confirmation,
        selectedAgent: payload.reply.selected_agent,
        missingFields: payload.reply.missing_fields,
      },
    });
  } catch (error) {
    return createErrorResponse(error, "The agent is unavailable right now.");
  }
}
