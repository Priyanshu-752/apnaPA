"use client";

import type { ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type DialogProps = {
  open: boolean;
  title: string;
  kicker?: string;
  description?: string;
  children: ReactNode;
  className?: string;
  onClose: () => void;
};

export function Dialog({ open, title, kicker, description, children, className, onClose }: DialogProps) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-50 grid place-items-center bg-foreground/35 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <motion.section
            role="dialog"
            aria-modal="true"
            aria-label={title}
            className={cn("max-h-[92vh] w-full max-w-2xl overflow-auto rounded-lg border bg-card p-4 shadow-soft", className)}
            initial={{ y: 24, scale: 0.98, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 14, scale: 0.98, opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                {kicker ? <span className="small-label">{kicker}</span> : null}
                <h2 className="text-xl font-extrabold leading-tight">{title}</h2>
                {description ? <p className="mt-1 text-sm leading-6 text-muted-foreground">{description}</p> : null}
              </div>
              <Button aria-label="Close dialog" size="icon" type="button" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            {children}
          </motion.section>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
