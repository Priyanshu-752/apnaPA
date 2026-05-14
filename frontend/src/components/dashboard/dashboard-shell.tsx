"use client";

import { useState } from "react";
import { AppSessionBootstrap } from "@/components/dashboard/app-session-bootstrap";
import { DashboardDialogs } from "@/components/dashboard/dialogs";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Topbar } from "@/components/dashboard/topbar";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <div className="min-h-screen bg-background lg:pl-64">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="min-w-0 p-4 md:p-6">
          <AppSessionBootstrap />
          <Topbar onOpenSidebar={() => setSidebarOpen(true)} />
          {children}
        </main>
      </div>
      <DashboardDialogs />
    </>
  );
}
