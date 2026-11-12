export interface QueryBuilderInput {
  columns: string;
  table: string;
  where: string;
  groupBy: string;
  orderBy: string;
  limit: string;
  distinct: boolean;
}

export function buildQuery(input: QueryBuilderInput): string {
  const columns = input.columns.trim() || "*";
  const table = input.table.trim();
  if (table.length === 0) {
    throw new Error("Table name is required.");
  }

  const parts: string[] = [];
  parts.push(`SELECT ${input.distinct ? "DISTINCT " : ""}${columns}`);
  parts.push(`FROM ${table}`);
  if (input.where.trim().length > 0) {
    parts.push(`WHERE ${input.where.trim()}`);
  }
  if (input.groupBy.trim().length > 0) {
    parts.push(`GROUP BY ${input.groupBy.trim()}`);
  }
  if (input.orderBy.trim().length > 0) {
    parts.push(`ORDER BY ${input.orderBy.trim()}`);
  }
  if (input.limit.trim().length > 0) {
    parts.push(`LIMIT ${input.limit.trim()}`);
  }
  return parts.join("\n");
}