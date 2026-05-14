import { NextResponse } from "next/server";
import { createErrorResponse, fetchBackendJson, getMessageFromPayload, normalizeUser } from "@/lib/backend-route";

type BackendProfileUpdate = {
  message?: string;
  user: {
    user_id: string;
    email: string;
    display_name: string;
    auth_provider: string;
    timezone: string;
    ai_style: string;
    onboarding_complete: boolean;
    telegram_linked: boolean;
  };
};

export async function PATCH(request: Request) {
  try {
    const body = (await request.json()) as { timezone?: string; aiStyle?: string };
    const payload = await fetchBackendJson<BackendProfileUpdate>("/api/settings/profile", {
      method: "PATCH",
      body: JSON.stringify({
        timezone: body.timezone,
        ai_style: body.aiStyle,
      }),
    });
    return NextResponse.json({
      message: getMessageFromPayload(payload, "Profile updated successfully."),
      user: normalizeUser(payload.user),
    });
  } catch (error) {
    return createErrorResponse(error, "Profile update failed.");
  }
}
