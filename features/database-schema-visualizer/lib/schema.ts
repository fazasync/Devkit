export interface ColumnDef {
  name: string;
  type: string;
}

export interface TableDef {
  name: string;
  columns: ColumnDef[];
}

export function parseSchema(sql: string): TableDef[] {
  const tables: TableDef[] = [];
  const regex = /CREATE\s+TABLE\s+(?:IF\s+NOT\s+EXISTS\s+)?[`"']?(\w+)[`"']?\s*\(([\s\S]*?)\)/gi;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(sql)) !== null) {
    const name = match[1];
    const body = match[2];
    const columns: ColumnDef[] = [];
    // Split by commas at top level (ignore commas inside parentheses).
    const parts: string[] = [];
    let depth = 0;
    let current = "";
    for (const ch of body) {
      if (ch === "(") depth++;
      else if (ch === ")") depth--;
      else if (ch === "," && depth === 0) {
        parts.push(current.trim());
        current = "";
        continue;
      }
      current += ch;
    }
    if (current.trim().length > 0) parts.push(current.trim());

    for (const part of parts) {
      // Skip constraints.
      if (/^(PRIMARY|FOREIGN|UNIQUE|CHECK|CONSTRAINT|KEY|INDEX)/i.test(part)) {
        continue;
      }
      const tokens = part.split(/\s+/);
      const colName = tokens[0].replace(/[`"']/g, "");
      const colType = tokens.slice(1).join(" ").replace(/,$/, "").trim();
      if (colName.length > 0) {
        columns.push({ name: colName, type: colType });
      }
    }

    tables.push({ name, columns });
  }
  return tables;
}