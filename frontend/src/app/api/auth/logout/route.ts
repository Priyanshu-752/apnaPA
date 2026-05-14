import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { clearSessionCookies, createErrorResponse, fetchBackendJson, getMessageFromPayload } from "@/lib/backend-route";
import { REFRESH_TOKEN_COOKIE } from "@/lib/session";

export async function POST() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get(REFRESH_TOKEN_COOKIE)?.value;

  try {
    if (refreshToken) {
      const payload = await fetchBackendJson<{ message?: string }>(
        "/api/auth/logout",
        {
          method: "POST",
          body: JSON.stringify({ refresh_token: refreshToken }),
        },
        { auth: false, retryOnUnauthorized: false },
      );
      await clearSessionCookies();
      return NextResponse.json({ message: getMessageFromPayload(payload, "Logged out successfully.") });
    }

    await clearSessionCookies();
    return NextResponse.json({ message: "Logged out successfully." });
  } catch (error) {
    await clearSessionCookies();
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 200 });
    }
    return createErrorResponse(error, "Logged out locally.");
  }
}
