"use client";

import { useEffect } from "react";
import { useRecentlyUsedStore } from "@/stores/recently-used-store";

export function RecentlyUsedTracker({ id }: { id: string }) {
  const add = useRecentlyUsedStore((state) => state.add);

  useEffect(() => {
    add(id);
  }, [id, add]);

  return null;
}