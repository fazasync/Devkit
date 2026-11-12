export type JsonValidationResult =
  | { ok: true; value: unknown }
  | { ok: false; error: string };

export function validateJson(input: string): JsonValidationResult {
  const trimmed = input.trim();
  if (trimmed.length === 0) {
    return { ok: false, error: "Input is empty." };
  }
  try {
    const value = JSON.parse(trimmed);
    return { ok: true, value };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Invalid JSON.";
    return { ok: false, error: message };
  }
}

export function formatJson(input: string, indent = 2): string {
  const result = validateJson(input);
  if (!result.ok) {
    throw new Error(result.error);
  }
  return JSON.stringify(result.value, null, indent);
}

export function minifyJson(input: string): string {
  const result = validateJson(input);
  if (!result.ok) {
    throw new Error(result.error);
  }
  return JSON.stringify(result.value);
}