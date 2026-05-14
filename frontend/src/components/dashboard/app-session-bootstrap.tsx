"use client";

import { startTransition, useEffect } from "react";
import { useRouter } from "next/navigation";
import { fetchBootstrap } from "@/lib/api";
import { useAppStore } from "@/stores/app-store";

export function AppSessionBootstrap() {
  const router = useRouter();
  const bootstrapStatus = useAppStore((state) => state.bootstrapStatus);
  const initializeApp = useAppStore((state) => state.initializeApp);
  const setBootstrapStatus = useAppStore((state) => state.setBootstrapStatus);
  const resetLocalState = useAppStore((state) => state.resetLocalState);
  const showToast = useAppStore((state) => state.showToast);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setBootstrapStatus("loading");
      try {
        const payload = await fetchBootstrap();
        if (cancelled) return;
        initializeApp(payload);
      } catch (error) {
        if (cancelled) return;
        const message = error instanceof Error ? error.message : "We could not load your workspace.";
        setBootstrapStatus("error");
        showToast({ tone: "error", title: "Workspace error", message });
        if ("status" in (error as object) && (error as { status?: number }).status === 401) {
          resetLocalState();
          startTransition(() => router.replace("/login"));
        }
      }
    }

    void load();

    return () => {
      cancelled = true;
    };
  }, [initializeApp, resetLocalState, router, setBootstrapStatus, showToast]);

  if (bootstrapStatus !== "loading") return null;

  return (
    <div className="mb-4 rounded-xl border border-[#cfe0dc] bg-white/80 px-4 py-3 text-sm font-bold text-[#20493d] shadow-soft">
      Syncing your workspace with the backend...
    </div>
  );
}
