import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ToolDefinition } from "@/types/tool";
import { cn } from "@/lib/utils";

interface ToolCardProps {
  tool: ToolDefinition;
  className?: string;
}

export function ToolCard({ tool, className }: ToolCardProps) {
  const Icon = tool.icon;

  return (
    <Link
      href={tool.href}
      className={cn(
        "group flex items-start gap-3 rounded-lg border border-border bg-card p-4 transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className,
      )}
    >
      <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground transition-colors group-hover:text-foreground">
        <Icon className="size-4" aria-hidden="true" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h3 className="truncate text-sm font-medium text-card-foreground">
            {tool.name}
          </h3>
          {tool.popular ? (
            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
              Popular
            </span>
          ) : null}
        </div>
        <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
          {tool.description}
        </p>
      </div>
      <ArrowRight
        className="size-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
        aria-hidden="true"
      />
    </Link>
  );
}