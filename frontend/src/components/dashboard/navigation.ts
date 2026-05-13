import type { ComponentType } from "react";
import { Bell, Dumbbell, LayoutDashboard, Settings, Sparkles, WalletCards } from "lucide-react";

export type DashboardPath = "/dashboard" | "/health" | "/finance" | "/reminders" | "/memory" | "/settings";

export const dashboardNav: Array<{
  href: DashboardPath;
  label: string;
  count?: number;
  icon: ComponentType<{ className?: string }>;
}> = [
  { href: "/dashboard", label: "Dashboard", count: 4, icon: LayoutDashboard },
  { href: "/health", label: "Health", count: 3, icon: Dumbbell },
  { href: "/finance", label: "Finance", count: 2, icon: WalletCards },
  { href: "/reminders", label: "Reminders", count: 5, icon: Bell },
  { href: "/memory", label: "Memory", count: 8, icon: Sparkles },
  { href: "/settings", label: "Settings", icon: Settings }
];

export const pageTitles: Record<DashboardPath, string> = {
  "/dashboard": "Daily command center",
  "/health": "Health and nutrition",
  "/finance": "Finance manager",
  "/reminders": "Reminder automation",
  "/memory": "Memory",
  "/settings": "Settings"
};
