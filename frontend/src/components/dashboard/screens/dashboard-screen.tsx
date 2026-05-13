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
  const openDialog = useAppStore((state) => state.openDialog);
  const openEntry = useAppStore((state) => state.openEntry);
  const openAgent = useAppStore((state) => state.openAgent);
  const completeReminder = useAppStore((state) => state.completeReminder);
  const completedReminders = useAppStore((state) => state.completedReminders);
  const remaining = Number(!onboardingDone) + Number(!telegramLinked);

  return (
    <ViewFrame>
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
        <Card>
          <CardHeader>
            <div>
              <span className="small-label">Setup</span>
              <CardTitle>Account foundation</CardTitle>
              <CardDescription>Dummy state mirrors the future backend-owned onboarding and Telegram linking flow.</CardDescription>
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
          <CardDescription className="mt-2">The backend later will generate this from daily state, memories, reminders, and events.</CardDescription>
        </Card>
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">{metrics.map((metric) => <MetricCard key={metric.label} metric={metric} />)}</div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
        <div className="grid content-start gap-4">
          <Card>
            <CardHeader>
              <div>
                <CardTitle>Daily state engine</CardTitle>
                <CardDescription>Mock backend state that will become the central intelligence layer.</CardDescription>
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
                <CardDescription>Events the backend will emit and store for analytics.</CardDescription>
              </div>
            </CardHeader>
            <div className="grid gap-3">{activity.map((item) => <ListItem key={item.title} {...item} />)}</div>
          </Card>
        </div>
        <div className="grid content-start gap-4">
          <Card className="bg-[#fffdfa]">
            <span className="small-label">AI insight</span>
            <CardTitle className="mt-1">Today's next best action</CardTitle>
            <CardDescription className="mt-2">
              Ask for a dinner log around 8:30 PM and suggest a high-protein option because protein is close to target but calories remain available.
            </CardDescription>
            <div className="mt-3 grid gap-3">
              <ListItem title="Memory confidence" meta="8 relevant memories retrieved" action={<strong>High</strong>} />
              <ListItem title="Automation" meta="n8n reminder workflow ready" action={<strong>21:00</strong>} />
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
