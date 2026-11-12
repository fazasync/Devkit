import type { LucideIcon } from "lucide-react";

export type ToolCategory =
  | "data-json"
  | "security-encoding"
  | "api-network"
  | "code-text"
  | "generators-utilities"
  | "database";

export interface ToolDefinition {
  id: string;
  name: string;
  description: string;
  category: ToolCategory;
  href: string;
  icon: LucideIcon;
  keywords: string[];
  popular?: boolean;
}

export interface CategoryDefinition {
  id: ToolCategory;
  label: string;
  description: string;
  icon: LucideIcon;
}