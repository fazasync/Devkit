"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { EmptyState } from "@/components/shared/empty-state";
import { ToolCard } from "@/components/shared/tool-card";
import { CATEGORIES } from "@/config/categories";
import { TOOLS, getToolsByCategory } from "@/config/tool-registry";
import type { ToolCategory } from "@/types/tool";
import { searchTools } from "@/lib/search";

function ToolsContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const [query, setQuery] = useState(searchParams.get("q") ?? "");

  const filtered = useMemo(() => {
    const base = categoryParam
      ? getToolsByCategory(categoryParam as ToolCategory)
      : TOOLS;
    return searchTools(query, base);
  }, [categoryParam, query]);

  const grouped = useMemo(() => {
    if (categoryParam) {
      const category = CATEGORIES.find((c) => c.id === categoryParam);
      return category ? [{ category, tools: filtered }] : [];
    }
    return CATEGORIES.map((cat) => ({
      category: cat,
      tools: filtered.filter((tool) => tool.category === cat.id),
    })).filter((group) => group.tools.length > 0);
  }, [categoryParam, filtered]);

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 p-6">
      <section className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          All Tools
        </h1>
        <p className="text-sm text-muted-foreground">
          Browse and search all developer utilities.
        </p>
      </section>

      <section>
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Filter tools..."
            className="h-10 w-full rounded-md border border-border bg-card pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Filter tools"
          />
        </div>
      </section>

      {filtered.length === 0 ? (
        <EmptyState
          icon={Search}
          title="No tools found"
          description="Try a different search term or category."
        />
      ) : (
        <div className="flex flex-col gap-8">
          {grouped.map((group) => (
            <section key={group.category.id} className="flex flex-col gap-3">
              <h2 className="text-lg font-semibold text-foreground">
                {group.category.label}
              </h2>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {group.tools.map((tool) => (
                  <ToolCard key={tool.id} tool={tool} />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ToolsPage() {
  return (
    <Suspense fallback={null}>
      <ToolsContent />
    </Suspense>
  );
}