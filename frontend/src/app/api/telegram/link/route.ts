import { NextResponse } from "next/server";
import { createErrorResponse, fetchBackendJson, getMessageFromPayload } from "@/lib/backend-route";

type BackendLinkToken = {
  link_token: string;
  expires_in_minutes: number;
};

export async function GET() {
  try {
    const payload = await fetchBackendJson<BackendLinkToken>("/api/telegram/link-token");
    return NextResponse.json({
      message: "Telegram link token generated successfully.",
      linkToken: payload.link_token,
      expiresInMinutes: payload.expires_in_minutes,
    });
  } catch (error) {
    return createErrorResponse(error, "Telegram link token could not be generated.");
  }
}

export async function POST() {
  try {
    const payload = await fetchBackendJson<{ message?: string }>("/api/telegram/link/confirm", {
      method: "POST",
    });
    return NextResponse.json({
      message: getMessageFromPayload(payload, "Telegram connected successfully."),
    });
  } catch (error) {
    return createErrorResponse(error, "Telegram could not be connected.");
  }
}
