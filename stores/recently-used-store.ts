import { create } from "zustand";
import { persist } from "zustand/middleware";

const MAX_RECENT = 10;

interface RecentlyUsedState {
  recentIds: string[];
  add: (id: string) => void;
  clear: () => void;
}

export const useRecentlyUsedStore = create<RecentlyUsedState>()(
  persist(
    (set) => ({
      recentIds: [],
      add: (id) =>
        set((state) => {
          const next = [id, ...state.recentIds.filter((item) => item !== id)];
          return { recentIds: next.slice(0, MAX_RECENT) };
        }),
      clear: () => set({ recentIds: [] }),
    }),
    { name: "devkit-recently-used" },
  ),
);