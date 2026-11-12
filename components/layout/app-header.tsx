"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Settings } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Kbd } from "@/components/ui/kbd";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { useCommandPaletteStore } from "@/stores/command-palette-store";

export function AppHeader() {
  const pathname = usePathname();
  const setOpen = useCommandPaletteStore((state) => state.setOpen);
  const setQuery = useCommandPaletteStore((state) => state.setQuery);

  const crumbs = pathname
    .split("/")
    .filter(Boolean)
    .map((segment, index, arr) => ({
      label: segment
        .replace(/-/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase()),
      href: "/" + arr.slice(0, index + 1).join("/"),
    }));

  return (
    <header className="flex h-14 shrink-0 items-center gap-3 border-b border-border bg-background px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="h-5" />

      <nav className="flex items-center gap-1.5 text-sm" aria-label="Breadcrumb">
        <Link
          href="/"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          Home
        </Link>
        {crumbs.map((crumb, index) => (
          <span key={crumb.href} className="flex items-center gap-1.5">
            <span className="text-muted-foreground">/</span>
            {index === crumbs.length - 1 ? (
              <span className="font-medium text-foreground">{crumb.label}</span>
            ) : (
              <Link
                href={crumb.href}
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                {crumb.label}
              </Link>
            )}
          </span>
        ))}
      </nav>

      <div className="ml-auto flex items-center gap-2">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="hidden h-9 w-64 items-center gap-2 rounded-md border border-border bg-muted/40 px-3 text-sm text-muted-foreground transition-colors hover:bg-muted md:flex"
          aria-label="Search tools"
        >
          <Search className="size-4" />
          <span className="flex-1 text-left">Search tools...</span>
          <Kbd>⌘K</Kbd>
        </button>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setOpen(true)}
          aria-label="Search tools"
        >
          <Search className="size-4" />
        </Button>
        <ThemeToggle />
        <Button variant="ghost" size="icon" aria-label="Settings" render={<Link href="/settings" />}>
          <Settings className="size-4" />
        </Button>
      </div>
    </header>
  );
}