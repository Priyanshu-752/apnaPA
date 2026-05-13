"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { memories } from "@/lib/dummy-data";
import { ListItem, ViewFrame } from "@/components/dashboard/shared";

export function MemoryScreen() {
  return (
    <ViewFrame>
      <Card>
        <CardHeader>
          <div><span className="small-label">Memory</span><CardTitle>Recently learned context</CardTitle></div>
          <Badge tone="blue">Dummy RAG preview</Badge>
        </CardHeader>
        <div className="grid gap-3">{memories.map((item) => <ListItem key={item.type} title={item.type} meta={item.summary} tone="blue" />)}</div>
      </Card>
    </ViewFrame>
  );
}
