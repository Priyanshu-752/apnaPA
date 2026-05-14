"use client";

import { Menu, MessageCircle, LogOut, Bot, Plus } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { pageTitles, type DashboardPath } from "@/components/dashboard/navigation";
import { logout } from "@/lib/api";
import { useAppStore } from "@/stores/app-store";

export function Topbar({ onOpenSidebar }: { onOpenSidebar: () => void }) {
  const pathname = usePathname() as DashboardPath;
  const router = useRouter();
  const profile = useAppStore((state) => state.profile);
  const todayLabel = useAppStore((state) => state.todayLabel);
  const openAgent = useAppStore((state) => state.openAgent);
  const openEntry = useAppStore((state) => state.openEntry);
  const openDialog = useAppStore((state) => state.openDialog);
  const telegramLinked = useAppStore((state) => state.telegramLinked);
  const resetLocalState = useAppStore((state) => state.resetLocalState);
  const showToast = useAppStore((state) => state.showToast);

  async function handleLogout() {
    try {
      const payload = await logout();
      resetLocalState();
      showToast({ tone: "success", title: "Signed out", message: payload.message });
      router.replace("/login");
    } catch (error) {
      resetLocalState();
      showToast({
        tone: "error",
        title: "Sign-out issue",
        message: error instanceof Error ? error.message : "You were signed out locally.",
      });
      router.replace("/login");
    }
  }

  return (
    <header className="mb-5 flex items-start justify-between gap-4 max-xl:flex-col">
      <div className="flex items-start gap-3">
        <Button className="lg:hidden" size="icon" type="button" onClick={onOpenSidebar}>
          <Menu className="h-4 w-4" />
        </Button>
        <div>
          <span className="small-label">{todayLabel}</span>
          <h1 className="text-3xl font-black leading-tight">{pageTitles[pathname] ?? "Dashboard"}</h1>
        </div>
      </div>
      <div className="flex flex-wrap justify-end gap-2">
        <span className="inline-flex min-h-9 items-center gap-2 rounded-full border bg-card px-3 text-sm font-bold">
          <span className="status-dot green" /> {profile.name} via {profile.authProvider}
        </span>
        <Button type="button" onClick={() => openDialog("telegram")}>
          <MessageCircle className="h-4 w-4" />
          {telegramLinked ? "Telegram linked" : "Connect Telegram"}
        </Button>
        <Button type="button" onClick={() => openEntry("meal")}><Plus className="h-4 w-4" />Log meal</Button>
        <Button type="button" onClick={() => openEntry("expense")}><Plus className="h-4 w-4" />Add expense</Button>
        <Button type="button" variant="primary" onClick={() => openAgent()}><Bot className="h-4 w-4" />Agent</Button>
        <Button type="button" onClick={handleLogout}><LogOut className="h-4 w-4" />Logout</Button>
      </div>
    </header>
  );
}
