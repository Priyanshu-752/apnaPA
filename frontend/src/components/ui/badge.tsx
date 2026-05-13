import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex min-h-7 items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-extrabold",
  {
    variants: {
      tone: {
        neutral: "border-border bg-card text-foreground",
        teal: "border-transparent bg-teal-soft text-teal",
        green: "border-transparent bg-green-soft text-green",
        amber: "border-transparent bg-amber-soft text-amber",
        blue: "border-transparent bg-blue-soft text-blue",
        coral: "border-transparent bg-coral-soft text-coral"
      }
    },
    defaultVariants: {
      tone: "neutral"
    }
  }
);

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

export function Badge({ className, tone, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ tone, className }))} {...props} />;
}
