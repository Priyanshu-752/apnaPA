import { NextResponse } from "next/server";
import { createErrorResponse, fetchBackendJson, getMessageFromPayload } from "@/lib/backend-route";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const payload = await fetchBackendJson<{ message?: string }>("/api/health/logs", {
      method: "POST",
      body: JSON.stringify({
        meal: body.meal,
        calories: body.calories,
        protein_grams: body.proteinGrams,
      }),
    });
    return NextResponse.json({
      message: getMessageFromPayload(payload, "Meal logged successfully."),
    });
  } catch (error) {
    return createErrorResponse(error, "Meal log could not be saved.");
  }
}
