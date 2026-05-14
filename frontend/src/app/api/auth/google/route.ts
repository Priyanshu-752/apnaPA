import { NextResponse } from "next/server";
import { createErrorResponse, fetchBackendJson, getMessageFromPayload, normalizeUser, setSessionCookies } from "@/lib/backend-route";

type BackendSessionPayload = {
  message?: string | null;
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
  tokens: {
    access_token: string;
    refresh_token: string;
    expires_in_seconds: number;
    token_type: string;
  };
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { idToken?: string };
    const payload = await fetchBackendJson<BackendSessionPayload>(
      "/api/auth/google",
      {
        method: "POST",
        body: JSON.stringify({ id_token: body.idToken }),
      },
      { auth: false, retryOnUnauthorized: false },
    );
    await setSessionCookies(payload);
    return NextResponse.json({
      message: getMessageFromPayload(payload, `Signed in successfully as ${payload.user.display_name}.`),
      user: normalizeUser(payload.user),
    });
  } catch (error) {
    return createErrorResponse(error, "Google sign-in could not be completed.");
  }
}
