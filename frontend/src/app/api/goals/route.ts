import { NextResponse } from "next/server";
import { createErrorResponse, fetchBackendJson, getMessageFromPayload } from "@/lib/backend-route";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const payload = await fetchBackendJson<{ message?: string }>("/api/goals", {
      method: "POST",
      body: JSON.stringify({
        title: body.title,
        target: body.target,
      }),
    });
    return NextResponse.json({
      message: getMessageFromPayload(payload, "Goal saved successfully."),
    });
  } catch (error) {
    return createErrorResponse(error, "Goal could not be saved.");
  }
}
