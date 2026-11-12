"use client";

import { useMemo } from "react";
import { Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/shared/empty-state";
import { ToolCard } from "@/components/shared/tool-card";
import { useRecentlyUsedStore } from "@/stores/recently-used-store";
import { getToolById } from "@/config/tool-registry";

export default function RecentlyUsedPage() {
  const recentIds = useRecentlyUsedStore((state) => state.recentIds);
  const clear = useRecentlyUsedStore((state) => state.clear);
  const tools = useMemo(
    () => recentIds.map((id) => getToolById(id)).filter(Boolean),
    [recentIds],
  );

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 p-6">
      <section className="flex items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Recently Used
          </h1>
          <p className="text-sm text-muted-foreground">
            Tools you opened recently.
          </p>
        </div>
        {tools.length > 0 ? (
          <Button variant="outline" size="sm" onClick={clear}>
            Clear
          </Button>
        ) : null}
      </section>

      {tools.length === 0 ? (
        <EmptyState
          icon={Clock}
          title="No recent tools"
          description="Open a tool to see it here."
        />
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <ToolCard key={tool!.id} tool={tool!} />
          ))}
        </div>
      )}
    </div>
  );
}