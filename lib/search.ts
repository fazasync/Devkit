import type { ToolDefinition } from "@/types/tool";

export function searchTools(query: string, tools: ToolDefinition[]): ToolDefinition[] {
  const normalized = query.trim().toLowerCase();
  if (normalized.length === 0) {
    return tools;
  }

  const terms = normalized.split(/\s+/).filter(Boolean);

  return tools.filter((tool) => {
    const haystack = [
      tool.name,
      tool.description,
      tool.category,
      ...tool.keywords,
    ]
      .join(" ")
      .toLowerCase();

    return terms.every((term) => haystack.includes(term));
  });
}