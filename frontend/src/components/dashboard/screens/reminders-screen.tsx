"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { automationRules, reminders } from "@/lib/dummy-data";
import { useAppStore } from "@/stores/app-store";
import { ListItem, ViewFrame } from "@/components/dashboard/shared";

export function RemindersScreen() {
  const openAgent = useAppStore((state) => state.openAgent);
  const completeReminder = useAppStore((state) => state.completeReminder);
  const completedReminders = useAppStore((state) => state.completedReminders);
  const showToast = useAppStore((state) => state.showToast);

  return (
    <ViewFrame>
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <div><span className="small-label">Reminders</span><CardTitle>Reminder queue</CardTitle><CardDescription>Completion changes state locally in this prototype.</CardDescription></div>
            <Button type="button" onClick={() => openAgent("Remind me to log dinner")}><Plus className="h-4 w-4" />New reminder</Button>
          </CardHeader>
          <div className="grid gap-3">
            {reminders.filter((item) => !completedReminders.includes(item.title)).map((reminder) => (
              <ListItem
                key={reminder.title}
                title={reminder.title}
                meta={`${reminder.time} - ${reminder.status}`}
                action={
                  <div className="flex gap-2">
                    <Button size="sm" type="button" onClick={() => completeReminder(reminder.title)}>Done</Button>
                    <Button size="sm" type="button" onClick={() => showToast("Reminder snoozed in dummy state.")}>Snooze</Button>
                  </div>
                }
              />
            ))}
          </div>
        </Card>
        <Card>
          <CardHeader><div><span className="small-label">Automation</span><CardTitle>Automation rules</CardTitle><CardDescription>These will be owned by FastAPI and scheduled through n8n.</CardDescription></div></CardHeader>
          <div className="grid gap-3">{automationRules.map((rule) => <ListItem key={rule.title} {...rule} badge="Enabled" />)}</div>
        </Card>
      </div>
    </ViewFrame>
  );
}
