"use client";

import { UserCog } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { settings } from "@/lib/dummy-data";
import { useAppStore } from "@/stores/app-store";
import { ListItem, ViewFrame } from "@/components/dashboard/shared";

export function SettingsScreen() {
  const profile = useAppStore((state) => state.profile);
  const openDialog = useAppStore((state) => state.openDialog);
  const systemSettings = settings
    .filter((item) => !["Timezone", "AI style"].includes(item.label))
    .map((item) => ({ title: item.label, meta: item.value }));

  return (
    <ViewFrame>
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.1fr)_minmax(280px,0.9fr)]">
        <Card className="bg-[#fffdfa]">
          <CardHeader>
            <div>
              <span className="small-label">Profile</span>
              <CardTitle>Personal details</CardTitle>
              <CardDescription>Keep your name, timezone, and assistant style current so the dashboard can adapt around you.</CardDescription>
            </div>
            <Button type="button" onClick={() => openDialog("profile")}>
              <UserCog className="h-4 w-4" />
              Edit details
            </Button>
          </CardHeader>
          <div className="grid gap-3 sm:grid-cols-2">
            <ListItem title="Name" meta={profile.name} tone="teal" />
            <ListItem title="Provider" meta={profile.authProvider} tone="blue" />
            <ListItem title="Timezone" meta={profile.timezone} tone="amber" />
            <ListItem title="AI style" meta={profile.aiStyle} tone="green" />
          </div>
        </Card>
        <Card>
          <CardHeader>
            <div>
              <span className="small-label">Settings</span>
              <CardTitle>System settings</CardTitle>
              <CardDescription>Profile preferences now sync through the backend session, while the wider account settings surface is still growing.</CardDescription>
            </div>
            <Badge tone="teal">Session-backed</Badge>
          </CardHeader>
          <div className="grid gap-3">{systemSettings.map((item) => <ListItem key={item.title} {...item} tone="teal" />)}</div>
        </Card>
      </div>
    </ViewFrame>
  );
}
