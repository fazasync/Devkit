import {
  Braces,
  Shield,
  Globe,
  Code,
  Sparkles,
  Database,
} from "lucide-react";
import type { CategoryDefinition } from "@/types/tool";

export const CATEGORIES: CategoryDefinition[] = [
  {
    id: "data-json",
    label: "Data & JSON",
    description: "Format, validate, and transform structured data.",
    icon: Braces,
  },
  {
    id: "security-encoding",
    label: "Security & Encoding",
    description: "Encode, decode, hash, and inspect security tokens.",
    icon: Shield,
  },
  {
    id: "api-network",
    label: "API & Network",
    description: "Build requests and inspect network-related data.",
    icon: Globe,
  },
  {
    id: "code-text",
    label: "Code & Text",
    description: "Format, compare, and transform code and text.",
    icon: Code,
  },
  {
    id: "generators-utilities",
    label: "Generators & Utilities",
    description: "Generate identifiers and convert common values.",
    icon: Sparkles,
  },
  {
    id: "database",
    label: "Database",
    description: "Format and work with SQL and schemas.",
    icon: Database,
  },
];

export const CATEGORY_MAP = Object.fromEntries(
  CATEGORIES.map((category) => [category.id, category]),
) as Record<CategoryDefinition["id"], CategoryDefinition>;