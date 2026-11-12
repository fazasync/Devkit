export interface CronExplanation {
  minute: string;
  hour: string;
  dayOfMonth: string;
  month: string;
  dayOfWeek: string;
}

function describeField(value: string, type: string): string {
  const v = value.trim();
  if (v === "*") return `every ${type}`;
  if (v.startsWith("*/")) return `every ${v.slice(2)} ${type}(s)`;
  if (v.includes(",")) return `${type} ${v}`;
  if (v.includes("-")) return `${type} ${v} (range)`;
  return `${type} ${v}`;
}

export function parseCron(expression: string): CronExplanation | null {
  const parts = expression.trim().split(/\s+/);
  if (parts.length !== 5) return null;
  return {
    minute: describeField(parts[0], "minute"),
    hour: describeField(parts[1], "hour"),
    dayOfMonth: describeField(parts[2], "day of month"),
    month: describeField(parts[3], "month"),
    dayOfWeek: describeField(parts[4], "day of week"),
  };
}

export function isValidCron(expression: string): boolean {
  return parseCron(expression) !== null;
}