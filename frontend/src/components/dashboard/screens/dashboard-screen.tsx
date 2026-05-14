"use client";

import { Bell, Bot, Check, CircleDollarSign, ClipboardList, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { activity, dashboardReminders, metrics } from "@/lib/dummy-data";
import { useAppStore } from "@/stores/app-store";
import { ListItem, MetricCard, SetupRow, ViewFrame, WeeklyTrend } from "@/components/dashboard/shared";

export function DashboardScreen() {
  const onboardingDone = useAppStore((state) => state.onboardingDone);
  const telegramLinked = useAppStore((state) => state.telegramLinked);
  const overview = useAppStore((state) => state.overview);
  const activityFeed = useAppStore((state) => state.activityFeed);
  const insights = useAppStore((state) => state.insights);
  const openDialog = useAppStore((state) => state.openDialog);
  const openEntry = useAppStore((state) => state.openEntry);
  const openAgent = useAppStore((state) => state.openAgent);
  const completeReminder = useAppStore((state) => state.completeReminder);
  const completedReminders = useAppStore((state) => state.completedReminders);
  const remaining = Number(!onboardingDone) + Number(!telegramLinked);
  const recentActivity = activityFeed.length ? activityFeed : activity;
  const nextInsights = insights.length ? insights : ["The backend will surface actionable insights here as more domain services come online."];

  return (
    <ViewFrame>
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
        <Card>
          <CardHeader>
            <div>
              <span className="small-label">Setup</span>
              <CardTitle>Account foundation</CardTitle>
              <CardDescription>Session-backed onboarding and Telegram states now come through the backend contract.</CardDescription>
            </div>
            <Badge tone={remaining === 0 ? "green" : "amber"}>{remaining === 0 ? "Ready" : `${remaining} step${remaining === 1 ? "" : "s"} left`}</Badge>
          </CardHeader>
          <div className="grid gap-3">
            <SetupRow label="Google account" tone="green" value="Done" />
            <SetupRow label={onboardingDone ? "Onboarding profile complete" : "Onboarding profile incomplete"} tone="amber" value="Complete" action={<Button size="sm" type="button" onClick={() => openDialog("onboarding")}>Complete</Button>} />
            <SetupRow label={telegramLinked ? "Telegram connected" : "Telegram not connected"} tone="teal" value="Connect" action={<Button size="sm" type="button" onClick={() => openDialog("telegram")}>Connect</Button>} />
          </div>
        </Card>
        <Card className="bg-[#fffdfa]">
          <span className="small-label">Agent insight</span>
          <CardTitle className="mt-1">Dinner and finance review are the next best actions.</CardTitle>
          <CardDescription className="mt-2">{overview.reminderSummary}</CardDescription>
        </Card>
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">{metrics.map((metric) => <MetricCard key={metric.label} metric={metric} />)}</div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
        <div className="grid content-start gap-4">
          <Card>
            <CardHeader>
              <div>
                <CardTitle>Daily state engine</CardTitle>
                <CardDescription>{overview.healthSummary}</CardDescription>
              </div>
              <Badge tone="coral">Missing dinner log</Badge>
            </CardHeader>
            <div className="flex flex-wrap gap-2">
              <Button type="button" onClick={() => openEntry("meal")}><Plus className="h-4 w-4" />Log meal</Button>
              <Button type="button" onClick={() => openEntry("expense")}><CircleDollarSign className="h-4 w-4" />Add expense</Button>
              <Button type="button" onClick={() => openAgent("Set a reminder")}><Bell className="h-4 w-4" />Set reminder</Button>
              <Button type="button" onClick={() => openAgent("Save this note")}><ClipboardList className="h-4 w-4" />Save note</Button>
            </div>
          </Card>
          <WeeklyTrend />
          <Card>
            <CardHeader>
              <div>
                <span className="small-label">Activity</span>
                <CardTitle>Recent activity</CardTitle>
                <CardDescription>Events flowing from the current backend slice.</CardDescription>
              </div>
            </CardHeader>
            <div className="grid gap-3">{recentActivity.map((item) => <ListItem key={`${item.title}-${item.meta}`} {...item} />)}</div>
          </Card>
        </div>
        <div className="grid content-start gap-4">
          <Card className="bg-[#fffdfa]">
            <span className="small-label">AI insight</span>
            <CardTitle className="mt-1">Today's next best action</CardTitle>
            <CardDescription className="mt-2">{nextInsights[0]}</CardDescription>
            <div className="mt-3 grid gap-3">
              <ListItem title="Finance summary" meta={overview.financeSummary} action={<strong>Live</strong>} />
              <ListItem title="Reminder summary" meta={overview.reminderSummary} action={<strong>Live</strong>} />
            </div>
          </Card>
          <Card>
            <CardHeader>
              <div>
                <CardTitle>Pending reminders</CardTitle>
                <CardDescription>Interactive mock queue.</CardDescription>
              </div>
            </CardHeader>
            <div className="grid gap-3">
              {dashboardReminders.filter((item) => !completedReminders.includes(item.title)).map((reminder) => (
                <ListItem
                  key={reminder.title}
                  title={reminder.title}
                  meta={reminder.meta}
                  action={<Button size="sm" type="button" onClick={() => completeReminder(reminder.title)}><Check className="h-3 w-3" />Done</Button>}
                />
              ))}
            </div>
          </Card>
        </div>
      </div>
    </ViewFrame>
  );
}
