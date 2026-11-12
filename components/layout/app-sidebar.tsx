"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Blocks,
  Home,
  Wrench,
  Star,
  Clock,
  Search,
  Settings,
  BookOpen,
  GitFork,
  ChevronRight,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { CATEGORIES } from "@/config/categories";
import { useCommandPaletteStore } from "@/stores/command-palette-store";

const MAIN_NAV = [
  { href: "/", label: "Home", icon: Home },
  { href: "/tools", label: "All Tools", icon: Wrench },
  { href: "/favorites", label: "Favorites", icon: Star },
  { href: "/recent", label: "Recently Used", icon: Clock },
];

export function AppSidebar() {
  const pathname = usePathname();
  const setOpen = useCommandPaletteStore((state) => state.setOpen);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" render={<Link href="/" />}>
              <div className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <Blocks className="size-4" />
              </div>
              <div className="flex flex-col gap-0.5 leading-none">
                <span className="font-semibold">DevKit</span>
                <span className="text-xs text-muted-foreground">
                  Build faster. Develop smarter.
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {MAIN_NAV.map((item) => {
                const Icon = item.icon;
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      isActive={isActive(item.href)}
                      tooltip={item.label}
                      render={<Link href={item.href} />}
                    >
                      <Icon />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Search tools" onClick={() => setOpen(true)}>
                  <Search />
                  <span>Search</span>
                  <kbd className="ml-auto rounded border border-border bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">
                    ⌘K
                  </kbd>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Categories</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {CATEGORIES.map((category) => {
                const Icon = category.icon;
                return (
                  <SidebarMenuItem key={category.id}>
                    <SidebarMenuButton
                      isActive={pathname === `/tools?category=${category.id}`}
                      tooltip={category.label}
                      render={<Link href={`/tools?category=${category.id}`} />}
                    >
                      <Icon />
                      <span>{category.label}</span>
                      <ChevronRight className="ml-auto opacity-50" />
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarSeparator />
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Settings" render={<Link href="/settings" />}>
              <Settings />
              <span>Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Documentation"
              render={<a href="https://github.com/fazasync/devkit" target="_blank" rel="noreferrer" />}
            >
              <BookOpen />
              <span>Documentation</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="GitHub"
              render={<a href="https://github.com/fazasync/devkit" target="_blank" rel="noreferrer" />}
            >
              <GitFork />
              <span>GitHub</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}