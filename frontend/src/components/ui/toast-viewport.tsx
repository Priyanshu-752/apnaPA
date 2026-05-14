"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/stores/app-store";

const toneClasses = {
  success: "border-[#0c6b52] bg-[#133d33] text-white",
  error: "border-[#b04b40] bg-[#4a231f] text-white",
  info: "border-[#256b8a] bg-[#193547] text-white",
} as const;

export function ToastViewport() {
  const toast = useAppStore((state) => state.toast);
  const clearToast = useAppStore((state) => state.clearToast);

  useEffect(() => {
    if (!toast) return;
    const timeout = window.setTimeout(clearToast, 3200);
    return () => window.clearTimeout(timeout);
  }, [toast, clearToast]);

  return (
    <AnimatePresence>
      {toast ? (
        <motion.div
          className={cn(
            "fixed bottom-5 right-5 z-[70] w-[min(380px,calc(100vw-40px))] rounded-xl border px-4 py-3 text-sm shadow-soft",
            toneClasses[toast.tone],
          )}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
        >
          {toast.title ? <p className="text-xs font-black uppercase tracking-[0.18em] text-white/70">{toast.title}</p> : null}
          <p className="mt-1 font-bold leading-6">{toast.message}</p>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
