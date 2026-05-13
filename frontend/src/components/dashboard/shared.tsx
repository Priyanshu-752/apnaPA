"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { weeklyTrend } from "@/lib/dummy-data";
import type { Metric, Tone } from "@/lib/schemas";
import { cn } from "@/lib/utils";
import { useAppStore, type RangeValue } from "@/stores/app-store";

const toneProgress: Record<Tone, string> = {
  teal: "bg-teal",
  green: "bg-green",
  amber: "bg-amber",
  blue: "bg-blue",
  coral: "bg-coral"
};

const rangeLabels: Record<RangeValue, string> = {
  today: "Today",
  week: "Last 7 days",
  month: "This month",
  custom: "Custom dates"
};

export function Brand({ dark = false }: { dark?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <div className="grid h-10 w-10 place-items-center rounded-lg bg-[#f2c46f] text-sm font-extrabold text-[#242927]">ap</div>
      <div>
        <div className={cn("text-sm font-extrabold leading-tight", dark ? "text-foreground" : "text-[#f7f4ee]")}>apnaPA</div>
        <div className={cn("mt-0.5 text-xs", dark ? "text-muted-foreground" : "text-[#f7f4ee]/65")}>Personal AI operating system</div>
      </div>
    </div>
  );
}

export function SetupRow({ label, tone, value, action }: { label: string; tone: Tone; value: string; action?: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border bg-secondary p-3">
      <span>{label}</span>
      {action ?? <Badge tone={tone}>{value}</Badge>}
    </div>
  );
}

export function Progress({ value, tone }: { value: number; tone: Tone }) {
  return (
    <div className="h-2 overflow-hidden rounded-full bg-secondary">
      <div className={cn("h-full rounded-full", toneProgress[tone])} style={{ width: `${value}%` }} />
    </div>
  );
}

export function MetricCard({ metric }: { metric: Metric }) {
  return (
    <Card className="grid min-h-36 content-between gap-3">
      <div className="flex justify-between gap-3">
        <div>
          <div className="small-label">{metric.label}</div>
          <div className="text-3xl font-black">{metric.value}</div>
        </div>
        <Badge tone={metric.tone}>{metric.badge}</Badge>
      </div>
      <Progress value={metric.progress} tone={metric.tone} />
      <p className="text-sm leading-6 text-muted-foreground">{metric.note}</p>
    </Card>
  );
}

export function ListItem({
  title,
  meta,
  tone = "blue",
  badge,
  action
}: {
  title: string;
  meta: string;
  tone?: Tone;
  badge?: string;
  action?: ReactNode;
}) {
  return (
    <article className="rounded-lg border bg-secondary p-3">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="font-extrabold">{title}</div>
          <div className="text-sm text-muted-foreground">{meta}</div>
        </div>
        {action ?? <Badge tone={tone}>{badge ?? tone}</Badge>}
      </div>
    </article>
  );
}

export function ViewFrame({ children }: { children: ReactNode }) {
  return (
    <motion.section className="grid gap-4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.18 }}>
      {children}
    </motion.section>
  );
}

export function WeeklyTrend() {
  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle>Weekly trend</CardTitle>
          <CardDescription>A compact preview of health consistency and daily spending.</CardDescription>
        </div>
        <Badge tone="teal">Mock chart</Badge>
      </CardHeader>
      <div className="grid min-h-48 grid-cols-7 items-end gap-3 rounded-lg border bg-secondary p-3">
        {weeklyTrend.map((item) => (
          <div className="grid justify-items-center gap-2 text-xs font-bold text-muted-foreground" key={item.day}>
            <motion.div className={cn("w-full max-w-8 rounded-t-lg rounded-b-sm", toneProgress[item.tone])} initial={{ height: 18 }} animate={{ height: item.height }} transition={{ duration: 0.35 }} />
            <span>{item.day}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

export function RangeToolbar({ domain }: { domain: "health" | "finance" }) {
  const range = useAppStore((state) => state.ranges[domain]);
  const setRange = useAppStore((state) => state.setRange);

  return (
    <div className="grid items-center gap-3 rounded-lg border bg-card p-4 shadow-soft lg:grid-cols-[minmax(0,1fr)_auto]">
      <div>
        <h2 className="text-xl font-extrabold">{domain === "health" ? "Health tracking" : "Finance tracking"}</h2>
        <p className="text-sm leading-6 text-muted-foreground">
          Defaults to today, with date-based summaries and drilldowns. <Badge tone={domain === "health" ? "teal" : "amber"}>Showing {rangeLabels[range]}</Badge>
        </p>
      </div>
      <div className="flex flex-wrap justify-end gap-2">
        {(Object.keys(rangeLabels) as RangeValue[]).map((value) => (
          <Button key={value} type="button" size="sm" variant={range === value ? "primary" : "secondary"} onClick={() => setRange(domain, value)}>
            {rangeLabels[value]}
          </Button>
        ))}
      </div>
      {range === "custom" ? (
        <div className="grid gap-3 lg:col-span-2 md:grid-cols-2">
          <label className="grid gap-1 text-xs font-bold text-muted-foreground">Start<Input type="date" defaultValue="2026-05-06" /></label>
          <label className="grid gap-1 text-xs font-bold text-muted-foreground">End<Input type="date" defaultValue="2026-05-12" /></label>
        </div>
      ) : null}
    </div>
  );
}
