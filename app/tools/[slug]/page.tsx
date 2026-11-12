import { notFound } from "next/navigation";
import { TOOLS } from "@/config/tool-registry";

export function generateStaticParams() {
  return TOOLS.map((tool) => ({ slug: tool.id }));
}
import Link from "next/link";
import { ArrowLeft, Construction } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState } from "@/components/shared/empty-state";
import { ToolCard } from "@/components/shared/tool-card";
import { FavoriteButton } from "@/components/shared/favorite-button";
import { RecentlyUsedTracker } from "@/components/shared/recently-used-tracker";
import { getToolById, getToolsByCategory } from "@/config/tool-registry";

export default async function ToolPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tool = getToolById(slug);

  if (!tool) {
    notFound();
  }

  const Icon = tool.icon;
  const related = getToolsByCategory(tool.category)
    .filter((item) => item.id !== tool.id)
    .slice(0, 6);

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 p-6">
      <RecentlyUsedTracker id={tool.id} />
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" render={<Link href="/tools" />} aria-label="Back to tools">
          <ArrowLeft className="size-4" />
        </Button>
        <div className="flex size-10 items-center justify-center rounded-md bg-muted text-muted-foreground">
          <Icon className="size-5" aria-hidden="true" />
        </div>
        <div className="min-w-0 flex-1">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            {tool.name}
          </h1>
          <p className="text-sm text-muted-foreground">{tool.description}</p>
        </div>
        <FavoriteButton id={tool.id} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Construction className="size-4 text-muted-foreground" />
            Coming soon
          </CardTitle>
          <CardDescription>
            This tool is part of the DevKit foundation and will be implemented in a later phase.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <EmptyState
            icon={Construction}
            title="Tool workspace not available yet"
            description="The application shell, registry, search, and navigation are ready. Tool logic arrives in Phase 2."
          />
        </CardContent>
      </Card>

      {related.length > 0 ? (
        <section className="flex flex-col gap-3">
          <h2 className="text-lg font-semibold text-foreground">Related Tools</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <ToolCard key={item.id} tool={item} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}