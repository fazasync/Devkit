export type TimestampUnit = "seconds" | "milliseconds";

export function timestampToDate(
  value: string,
  unit: TimestampUnit = "seconds",
): Date {
  const trimmed = value.trim();
  if (trimmed.length === 0) {
    throw new Error("Input is empty.");
  }
  const number = Number(trimmed);
  if (!Number.isFinite(number)) {
    throw new Error("Invalid timestamp.");
  }
  const ms = unit === "seconds" ? number * 1000 : number;
  const date = new Date(ms);
  if (Number.isNaN(date.getTime())) {
    throw new Error("Invalid timestamp.");
  }
  return date;
}

export function dateToTimestamp(
  value: string,
  unit: TimestampUnit = "seconds",
): number {
  const trimmed = value.trim();
  if (trimmed.length === 0) {
    throw new Error("Input is empty.");
  }
  const date = new Date(trimmed);
  if (Number.isNaN(date.getTime())) {
    throw new Error("Invalid date.");
  }
  const ms = date.getTime();
  return unit === "seconds" ? Math.floor(ms / 1000) : ms;
}

export function formatIso(date: Date): string {
  return date.toISOString();
}

export function nowTimestamp(unit: TimestampUnit = "seconds"): number {
  const ms = Date.now();
  return unit === "seconds" ? Math.floor(ms / 1000) : ms;
}