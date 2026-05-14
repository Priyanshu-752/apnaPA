import { NextResponse } from "next/server";
import { createErrorResponse, fetchBackendJson, normalizeUser } from "@/lib/backend-route";

function formatTodayLabel() {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(new Date());
}

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

type BackendOverview = {
  today_label: string;
  health_summary: string;
  finance_summary: string;
  reminder_summary: string;
};

type BackendActivityItem = {
  title: string;
  meta: string;
};

type BackendInsights = {
  insights: string[];
};

export async function GET() {
  try {
    const user = await fetchBackendJson<BackendUser>("/api/auth/me");
    const [overview, activity, insights] = await Promise.all([
      fetchBackendJson<BackendOverview>("/api/dashboard/overview"),
      fetchBackendJson<BackendActivityItem[]>("/api/dashboard/activity"),
      fetchBackendJson<BackendInsights>("/api/dashboard/insights"),
    ]);

    return NextResponse.json({
      user: normalizeUser(user),
      overview: {
        todayLabel: overview.today_label === "Today" ? formatTodayLabel() : overview.today_label,
        healthSummary: overview.health_summary,
        financeSummary: overview.finance_summary,
        reminderSummary: overview.reminder_summary,
      },
      activity,
      insights: insights.insights,
    });
  } catch (error) {
    return createErrorResponse(error, "We could not load your workspace.");
  }
}
