"use client";

import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFavoritesStore } from "@/stores/favorites-store";

export function FavoriteButton({ id }: { id: string }) {
  const isFavorite = useFavoritesStore((state) => state.favoriteIds.includes(id));
  const toggle = useFavoritesStore((state) => state.toggle);

  return (
    <Button
      variant={isFavorite ? "default" : "outline"}
      size="sm"
      onClick={() => toggle(id)}
      aria-pressed={isFavorite}
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      <Star className="size-4" />
      {isFavorite ? "Favorited" : "Favorite"}
    </Button>
  );
}