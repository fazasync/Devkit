import { load, dump } from "js-yaml";

export function formatYaml(input: string): string {
  const trimmed = input.trim();
  if (trimmed.length === 0) {
    throw new Error("Input is empty.");
  }
  let value: unknown;
  try {
    value = load(trimmed);
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Invalid YAML.");
  }
  return dump(value, { indent: 2, lineWidth: -1 });
}

export function minifyYaml(input: string): string {
  const trimmed = input.trim();
  if (trimmed.length === 0) {
    throw new Error("Input is empty.");
  }
  let value: unknown;
  try {
    value = load(trimmed);
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Invalid YAML.");
  }
  return dump(value, { indent: 0, lineWidth: -1 }).replace(/\n/g, " ").trim();
}

export function validateYaml(input: string): boolean {
  const trimmed = input.trim();
  if (trimmed.length === 0) return false;
  try {
    load(trimmed);
    return true;
  } catch {
    return false;
  }
}