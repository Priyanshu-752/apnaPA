import { NextResponse } from "next/server";
import { createErrorResponse, fetchBackendJson, getMessageFromPayload } from "@/lib/backend-route";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const payload = await fetchBackendJson<{ message?: string }>("/api/finance/logs", {
      method: "POST",
      body: JSON.stringify({
        category: body.category,
        amount: body.amount,
        note: body.note,
      }),
    });
    return NextResponse.json({
      message: getMessageFromPayload(payload, "Expense saved successfully."),
    });
  } catch (error) {
    return createErrorResponse(error, "Expense could not be saved.");
  }
}
