"use client";

import { useMemo } from "react";
import { Star } from "lucide-react";
import { EmptyState } from "@/components/shared/empty-state";
import { ToolCard } from "@/components/shared/tool-card";
import { useFavoritesStore } from "@/stores/favorites-store";
import { getToolById } from "@/config/tool-registry";

export default function FavoritesPage() {
  const favoriteIds = useFavoritesStore((state) => state.favoriteIds);
  const tools = useMemo(
    () => favoriteIds.map((id) => getToolById(id)).filter(Boolean),
    [favoriteIds],
  );

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 p-6">
      <section className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Favorites
        </h1>
        <p className="text-sm text-muted-foreground">
          Tools you have marked as favorites.
        </p>
      </section>

      {tools.length === 0 ? (
        <EmptyState
          icon={Star}
          title="No favorites yet"
          description="Star a tool to see it here."
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