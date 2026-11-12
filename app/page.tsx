"use client";

import Link from "next/link";
import { useMemo } from "react";
import { Search, Sparkles, Star, Clock, Folder } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState } from "@/components/shared/empty-state";
import { ToolCard } from "@/components/shared/tool-card";
import { useFavoritesStore } from "@/stores/favorites-store";
import { useRecentlyUsedStore } from "@/stores/recently-used-store";
import { useCommandPaletteStore } from "@/stores/command-palette-store";
import { TOOLS, getToolById } from "@/config/tool-registry";
import { CATEGORIES } from "@/config/categories";

export default function Home() {
  const favoriteIds = useFavoritesStore((state) => state.favoriteIds);
  const recentIds = useRecentlyUsedStore((state) => state.recentIds);
  const setOpen = useCommandPaletteStore((state) => state.setOpen);
  const setQuery = useCommandPaletteStore((state) => state.setQuery);

  const favoriteTools = useMemo(
    () => favoriteIds.map((id) => getToolById(id)).filter(Boolean) as typeof TOOLS,
    [favoriteIds],
  );
  const recentTools = useMemo(
    () => recentIds.map((id) => getToolById(id)).filter(Boolean) as typeof TOOLS,
    [recentIds],
  );
  const popularTools = useMemo(() => TOOLS.filter((tool) => tool.popular), []);

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 p-6">
      <section className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Welcome to DevKit
        </h1>
        <p className="text-sm text-muted-foreground">
          Your essential developer utilities, all in one workspace.
        </p>
      </section>

      <section>
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search developer tools..."
            className="h-11 w-full rounded-lg border border-border bg-card pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            onFocus={() => setOpen(true)}
            onChange={(event) => {
              setQuery(event.target.value);
              setOpen(true);
            }}
            aria-label="Search developer tools"
          />
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Star className="size-4 text-muted-foreground" />
              Favorite Tools
            </CardTitle>
            <CardDescription>Tools you have marked as favorites.</CardDescription>
          </CardHeader>
          <CardContent>
            {favoriteTools.length === 0 ? (
              <EmptyState
                icon={Star}
                title="No favorites yet"
                description="Star a tool from its page to see it here."
              />
            ) : (
              <div className="grid gap-3 sm:grid-cols-2">
                {favoriteTools.map((tool) => (
                  <ToolCard key={tool.id} tool={tool} />
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Clock className="size-4 text-muted-foreground" />
              Recently Used
            </CardTitle>
            <CardDescription>Tools you opened recently.</CardDescription>
          </CardHeader>
          <CardContent>
            {recentTools.length === 0 ? (
              <EmptyState
                icon={Clock}
                title="No recent tools"
                description="Open a tool to see it here."
              />
            ) : (
              <div className="grid gap-3 sm:grid-cols-2">
                {recentTools.map((tool) => (
                  <ToolCard key={tool.id} tool={tool} />
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold text-foreground">Browse Categories</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((category) => {
            const Icon = category.icon;
            const count = TOOLS.filter((tool) => tool.category === category.id).length;
            return (
              <Link
                key={category.id}
                href={`/tools?category=${category.id}`}
                className="group flex items-start gap-3 rounded-lg border border-border bg-card p-4 transition-colors hover:bg-accent"
              >
                <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground transition-colors group-hover:text-foreground">
                  <Icon className="size-4" aria-hidden="true" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-medium text-card-foreground">
                    {category.label}
                  </h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {category.description}
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground">{count} tools</p>
                </div>
                <Folder className="size-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true" />
              </Link>
            );
          })}
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-foreground">
          <Sparkles className="size-4 text-muted-foreground" />
          Popular Tools
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {popularTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>
    </div>
  );
}