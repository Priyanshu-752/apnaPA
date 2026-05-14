"use client";

import type {
  AgentChatPayload,
  DashboardBootstrap,
  MessagePayload,
  ProfileUpdatePayload,
  SessionPayload,
  TelegramLinkPayload,
} from "@/lib/api-types";

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly payload: unknown,
  ) {
    super(message);
  }
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

function getMessage(payload: unknown, fallback: string) {
  if (!payload || typeof payload !== "object") return fallback;
  const record = payload as { message?: unknown };
  return typeof record.message === "string" && record.message.trim() ? record.message : fallback;
}

async function requestJson<T>(input: string, init: RequestInit = {}) {
  const headers = new Headers(init.headers);
  if (init.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }
  headers.set("Accept", "application/json");

  const response = await fetch(input, {
    ...init,
    headers,
    cache: "no-store",
  });
  const payload = await readPayload(response);
  if (!response.ok) {
    throw new ApiError(getMessage(payload, "The request failed."), response.status, payload);
  }
  return payload as T;
}

export function fetchBootstrap() {
  return requestJson<DashboardBootstrap>("/api/app/bootstrap");
}

export function loginWithGoogle(idToken: string) {
  return requestJson<SessionPayload>("/api/auth/google", {
    method: "POST",
    body: JSON.stringify({ idToken }),
  });
}

export function logout() {
  return requestJson<MessagePayload>("/api/auth/logout", {
    method: "POST",
  });
}

export function completeOnboarding() {
  return requestJson<MessagePayload>("/api/onboarding/complete", {
    method: "POST",
  });
}

export function fetchTelegramLinkToken() {
  return requestJson<TelegramLinkPayload>("/api/telegram/link");
}

export function confirmTelegramLink() {
  return requestJson<MessagePayload>("/api/telegram/link", {
    method: "POST",
  });
}

export function saveProfile(payload: { timezone: string; aiStyle: string }) {
  return requestJson<ProfileUpdatePayload>("/api/settings/profile", {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}

export function createHealthLog(payload: { meal: string; calories: number; proteinGrams: number }) {
  return requestJson<MessagePayload>("/api/health/logs", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function createFinanceLog(payload: { category: string; amount: number; note: string }) {
  return requestJson<MessagePayload>("/api/finance/logs", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function createGoal(payload: { title: string; target: string }) {
  return requestJson<MessagePayload>("/api/goals", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function chatWithAgent(payload: { message: string; source?: string }) {
  return requestJson<AgentChatPayload>("/api/agent/chat", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
