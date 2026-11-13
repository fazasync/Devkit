import { dump } from "js-yaml";

export function convertJsonToYaml(input: string): string {
  const trimmed = input.trim();
  if (trimmed.length === 0) {
    throw new Error("Input is empty.");
  }
  let value: unknown;
  try {
    value = JSON.parse(trimmed);
  } catch {
    throw new Error("Invalid JSON.");
  }
  return dump(value, { indent: 2, lineWidth: -1 });
}