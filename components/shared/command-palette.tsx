"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { useCommandPaletteStore } from "@/stores/command-palette-store";
import { useRecentlyUsedStore } from "@/stores/recently-used-store";
import { getToolsByCategory } from "@/config/tool-registry";
import { CATEGORIES } from "@/config/categories";

export function CommandPalette() {
  const router = useRouter();
  const open = useCommandPaletteStore((state) => state.open);
  const query = useCommandPaletteStore((state) => state.query);
  const setOpen = useCommandPaletteStore((state) => state.setOpen);
  const setQuery = useCommandPaletteStore((state) => state.setQuery);
  const addRecent = useRecentlyUsedStore((state) => state.add);

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        useCommandPaletteStore.getState().toggle();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const handleSelect = (id: string, href: string) => {
    addRecent(id);
    setOpen(false);
    setQuery("");
    router.push(href);
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <Command>
        <CommandInput
          placeholder="Search developer tools..."
          value={query}
          onValueChange={setQuery}
        />
        <CommandList>
          <CommandEmpty>No tools found.</CommandEmpty>
        {CATEGORIES.map((category) => {
          const tools = getToolsByCategory(category.id);
          if (tools.length === 0) return null;
          const filtered = query.trim()
            ? tools.filter((tool) =>
                [tool.name, tool.description, ...tool.keywords]
                  .join(" ")
                  .toLowerCase()
                  .includes(query.trim().toLowerCase()),
              )
            : tools;
          if (filtered.length === 0) return null;
          return (
            <CommandGroup key={category.id} heading={category.label}>
              {filtered.map((tool) => {
                const Icon = tool.icon;
                return (
                  <CommandItem
                    key={tool.id}
                    value={`${tool.name} ${tool.keywords.join(" ")}`}
                    onSelect={() => handleSelect(tool.id, tool.href)}
                  >
                    <Icon className="size-4" />
                    <span>{tool.name}</span>
                    <span className="ml-auto text-xs text-muted-foreground">
                      {category.label}
                    </span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          );
        })}
      </CommandList>
      </Command>
    </CommandDialog>
  );
}