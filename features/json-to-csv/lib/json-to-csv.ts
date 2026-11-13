export function convertJsonToCsv(input: string): string {
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

  if (!Array.isArray(value)) {
    throw new Error("Input must be a JSON array.");
  }
  if (value.length === 0) {
    return "";
  }

  // Array of primitives.
  if (value.every((item) => typeof item !== "object" || item === null)) {
    return value.map((item) => escapeCsv(String(item))).join(",");
  }

  const headers = Array.from(
    new Set(value.flatMap((item) => (item && typeof item === "object" ? Object.keys(item) : []))),
  );

  const rows = value.map((item) => {
    if (!item || typeof item !== "object") return headers.map(() => "").join(",");
    const obj = item as Record<string, unknown>;
    return headers.map((h) => escapeCsv(formatValue(obj[h]))).join(",");
  });

  return [headers.join(","), ...rows].join("\n");
}

function formatValue(value: unknown): string {
  if (value === null || value === undefined) return "";
  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
}

function escapeCsv(value: string): string {
  if (/[",\n]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}