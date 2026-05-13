"use client";

import { Bot, Goal, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { categoryBreakdown, financeMetrics, financeSuggestions, financeSummaries } from "@/lib/dummy-data";
import { useAppStore } from "@/stores/app-store";
import { ListItem, MetricCard, Progress, RangeToolbar, ViewFrame } from "@/components/dashboard/shared";

export function FinanceScreen() {
  const openEntry = useAppStore((state) => state.openEntry);
  const openGoal = useAppStore((state) => state.openGoal);
  const openAgent = useAppStore((state) => state.openAgent);
  const openDetail = useAppStore((state) => state.openDetail);

  return (
    <ViewFrame>
      <RangeToolbar domain="finance" />
      <div className="grid gap-4 xl:grid-cols-3">{financeMetrics.map((metric) => <MetricCard key={metric.label} metric={metric} />)}</div>
      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="grid gap-4">
          <div><span className="small-label">Active finance goal</span><CardTitle className="mt-1">Save Rs. 20,000 this month</CardTitle><CardDescription className="mt-2">Also watching a Rs. 25,000 monthly spend limit and Rs. 8,000 food category cap.</CardDescription></div>
          <Progress value={62} tone="green" />
          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={() => openGoal("finance")}><Goal className="h-4 w-4" />Set goal</Button>
            <Button type="button" onClick={() => openAgent("Help me review my expense budget")}><Bot className="h-4 w-4" />Ask Agent</Button>
          </div>
        </Card>
        <Card>
          <span className="small-label">AI suggestions</span>
          <CardTitle className="mt-1">Suggested finance targets</CardTitle>
          <CardDescription className="mt-2">The agent can ask for income, fixed expenses, and priorities before suggesting budgets.</CardDescription>
          <div className="mt-3 grid gap-3">{financeSuggestions.map((item) => <ListItem key={item.title} {...item} badge="Optional" />)}</div>
        </Card>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader><div><CardTitle>Category breakdown</CardTitle><CardDescription>CSS bars, ready to become chart components later.</CardDescription></div></CardHeader>
          <div className="grid gap-3">
            {categoryBreakdown.map((item) => (
              <div className="grid items-center gap-3 md:grid-cols-[90px_minmax(0,1fr)_90px]" key={item.category}>
                <strong>{item.category}</strong><Progress value={item.progress} tone={item.tone} /><span className="text-sm text-muted-foreground">{item.value}</span>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <CardHeader>
            <div><span className="small-label">Finance</span><CardTitle>Finance daily summaries</CardTitle><CardDescription>Click a date to see transactions, totals, goal progress, and the AI summary.</CardDescription></div>
            <Button type="button" onClick={() => openEntry("expense")}><Plus className="h-4 w-4" />Add expense</Button>
          </CardHeader>
          <div className="grid gap-2">
            {financeSummaries.map((row) => (
              <button className="table-row grid w-full gap-3 rounded-lg border bg-secondary p-3 text-left text-sm hover:border-teal hover:bg-[#fffdfa] max-lg:grid-cols-1" key={row.iso} type="button" onClick={() => openDetail({ domain: "finance", date: row.iso })}>
                <strong>{row.date}</strong><span>{row.spent}</span><span>{row.saved} saved</span><span>{row.top}</span><span>{row.transactions} txns</span><span>{row.summary}</span>
              </button>
            ))}
          </div>
        </Card>
      </div>
    </ViewFrame>
  );
}
