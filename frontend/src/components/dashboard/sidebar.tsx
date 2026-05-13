"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { dashboardNav } from "@/components/dashboard/navigation";
import { Brand } from "@/components/dashboard/shared";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/stores/app-store";

type SidebarProps = {
  open: boolean;
  onClose: () => void;
};

export function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname();
  const telegramLinked = useAppStore((state) => state.telegramLinked);

  return (
    <>
      {open ? <button aria-label="Close sidebar overlay" className="fixed inset-0 z-30 bg-black/30 lg:hidden" onClick={onClose} /> : null}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-64 flex-col gap-5 bg-[#242927] p-4 text-[#f7f4ee] transition-transform duration-200 lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between border-b border-white/10 p-1 pb-4">
          <Brand />
          <Button className="lg:hidden" size="icon" type="button" variant="ghost" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <nav className="grid gap-1" aria-label="Dashboard sections">
          {dashboardNav.map((item) => {
            const active = pathname === item.href;
            return (
              <Button
                key={item.href}
                asChild
                className={cn("grid min-h-11 grid-cols-[28px_minmax(0,1fr)_auto] justify-start border-0 px-2 text-left text-[#f7f4ee]/75", active && "bg-white/10 text-white")}
                variant="ghost"
              >
                <Link href={item.href} onClick={onClose}>
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                  <span className="text-xs text-[#f7f4ee]/60">{item.count ?? ""}</span>
                </Link>
              </Button>
            );
          })}
        </nav>

        <div className="mt-auto grid gap-3 text-sm text-[#f7f4ee]/80">
          <span className="small-label text-[#f7f4ee]/60">System status</span>
          <div className="flex items-center gap-2"><span className={cn("status-dot", telegramLinked && "green")} />{telegramLinked ? "Telegram sync connected" : "Telegram sync pending"}</div>
          <div className="flex items-center gap-2"><span className="status-dot green" />Dummy data mode</div>
        </div>
      </aside>
    </>
  );
}
