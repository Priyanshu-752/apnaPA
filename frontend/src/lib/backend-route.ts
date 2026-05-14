import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ACCESS_TOKEN_COOKIE, REFRESH_TOKEN_COOKIE, SESSION_COOKIE } from "@/lib/session";
import type { AppProfile } from "@/lib/api-types";

const backendBaseUrl = (process.env.APNAPA_BACKEND_URL ?? "http://127.0.0.1:8000").replace(/\/+$/, "");
const secure = process.env.NODE_ENV === "production";
const refreshCookieMaxAge = 60 * 60 * 24 * 14;

type BackendTokenBundle = {
  access_token: string;
  refresh_token: string;
  expires_in_seconds: number;
  token_type: string;
};

type BackendSessionPayload = {
  message?: string | null;
  user: BackendUser;
  tokens: BackendTokenBundle;
};

type BackendUser = {
  user_id: string;
  email: string;
  display_name: string;
  auth_provider: string;
  timezone: string;
  ai_style: string;
  onboarding_complete: boolean;
  telegram_linked: boolean;
};

export class BackendRouteError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly payload: unknown,
  ) {
    super(message);
  }
}

function buildBackendUrl(path: string) {
  return path.startsWith("http") ? path : `${backendBaseUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

async function readPayload(response: Response) {
  const text = await response.text();
  if (!text) return null;
  try {
    return JSON.parse(text) as unknown;
  } catch {
    return { message: text };
  }
}

function formatProviderName(value: string) {
  return value
    .split(/[_\s-]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function formatDetail(detail: unknown) {
  if (typeof detail === "string") return detail;
  if (Array.isArray(detail)) {
    return detail
      .map((issue) => {
        if (!issue || typeof issue !== "object") return null;
        const record = issue as { loc?: unknown[]; msg?: string };
        const field = Array.isArray(record.loc) ? String(record.loc[record.loc.length - 1] ?? "").replaceAll("_", " ") : "";
        return field ? `${field}: ${record.msg ?? "Invalid value."}` : record.msg ?? "Invalid value.";
      })
      .filter(Boolean)
      .join(" ");
  }
  return null;
}

export function getMessageFromPayload(payload: unknown, fallback: string) {
  if (!payload || typeof payload !== "object") return fallback;
  const record = payload as { message?: unknown; detail?: unknown };
  if (typeof record.message === "string" && record.message.trim()) return record.message;
  const formattedDetail = formatDetail(record.detail);
  return formattedDetail ?? fallback;
}

export function normalizeUser(user: BackendUser): AppProfile {
  return {
    userId: user.user_id,
    email: user.email,
    name: user.display_name,
    authProvider: formatProviderName(user.auth_provider),
    timezone: user.timezone,
    aiStyle: user.ai_style,
    onboardingComplete: user.onboarding_complete,
    telegramLinked: user.telegram_linked,
  };
}

export async function setSessionCookies(session: BackendSessionPayload) {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, "1", {
    httpOnly: true,
    sameSite: "lax",
    secure,
    path: "/",
    maxAge: refreshCookieMaxAge,
  });
  cookieStore.set(ACCESS_TOKEN_COOKIE, session.tokens.access_token, {
    httpOnly: true,
    sameSite: "lax",
    secure,
    path: "/",
    maxAge: session.tokens.expires_in_seconds,
  });
  cookieStore.set(REFRESH_TOKEN_COOKIE, session.tokens.refresh_token, {
    httpOnly: true,
    sameSite: "lax",
    secure,
    path: "/",
    maxAge: refreshCookieMaxAge,
  });
}

export async function clearSessionCookies() {
  const cookieStore = await cookies();
  for (const name of [SESSION_COOKIE, ACCESS_TOKEN_COOKIE, REFRESH_TOKEN_COOKIE]) {
    cookieStore.delete(name);
  }
}

async function refreshAccessToken(refreshToken: string) {
  const response = await fetch(buildBackendUrl("/api/auth/refresh"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ refresh_token: refreshToken }),
    cache: "no-store",
  });
  const payload = await readPayload(response);
  if (!response.ok) {
    await clearSessionCookies();
    throw new BackendRouteError(getMessageFromPayload(payload, "Your session expired. Please sign in again."), response.status, payload);
  }
  await setSessionCookies(payload as BackendSessionPayload);
  return payload as BackendSessionPayload;
}

export async function fetchBackendJson<T>(
  path: string,
  init: RequestInit = {},
  options: { auth?: boolean; retryOnUnauthorized?: boolean } = {},
) {
  const auth = options.auth ?? true;
  const retryOnUnauthorized = options.retryOnUnauthorized ?? true;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(ACCESS_TOKEN_COOKIE)?.value;
  const refreshToken = cookieStore.get(REFRESH_TOKEN_COOKIE)?.value;
  const headers = new Headers(init.headers);
  headers.set("Accept", "application/json");
  if (init.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }
  if (auth && accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }

  let response = await fetch(buildBackendUrl(path), {
    ...init,
    headers,
    cache: "no-store",
  });
  let payload = await readPayload(response);

  if (auth && response.status === 401 && retryOnUnauthorized && refreshToken) {
    const refreshedSession = await refreshAccessToken(refreshToken);
    headers.set("Authorization", `Bearer ${refreshedSession.tokens.access_token}`);
    response = await fetch(buildBackendUrl(path), {
      ...init,
      headers,
      cache: "no-store",
    });
    payload = await readPayload(response);
  }

  if (!response.ok) {
    throw new BackendRouteError(getMessageFromPayload(payload, "The request could not be completed."), response.status, payload);
  }

  return payload as T;
}

export function createErrorResponse(error: unknown, fallback: string) {
  if (error instanceof BackendRouteError) {
    return NextResponse.json({ message: getMessageFromPayload(error.payload, error.message) }, { status: error.status });
  }

  return NextResponse.json({ message: fallback }, { status: 500 });
}
