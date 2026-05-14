import { NextResponse } from "next/server";
import { createErrorResponse, fetchBackendJson, getMessageFromPayload } from "@/lib/backend-route";

export async function POST() {
  try {
    const payload = await fetchBackendJson<{ message?: string }>("/api/onboarding/complete", {
      method: "POST",
    });
    return NextResponse.json({
      message: getMessageFromPayload(payload, "Onboarding completed successfully."),
    });
  } catch (error) {
    return createErrorResponse(error, "Onboarding could not be completed.");
  }
}
