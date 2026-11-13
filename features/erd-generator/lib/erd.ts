export interface ErdTable {
  name: string;
  columns: { name: string; type: string }[];
}

export interface ErdRelation {
  from: string;
  fromColumn: string;
  to: string;
  toColumn: string;
}

export interface ErdResult {
  tables: ErdTable[];
  relations: ErdRelation[];
}

export function parseErd(sql: string): ErdResult {
  const tables: ErdTable[] = [];
  const relations: ErdRelation[] = [];

  const tableRegex =
    /CREATE\s+TABLE\s+(?:IF\s+NOT\s+EXISTS\s+)?[`"']?(\w+)[`"']?\s*\(([\s\S]*?)\)/gi;
  let match: RegExpExecArray | null;
  while ((match = tableRegex.exec(sql)) !== null) {
    const name = match[1];
    const body = match[2];
    const columns: { name: string; type: string }[] = [];

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
      if (/^(FOREIGN\s+KEY)/i.test(part)) {
        const fkMatch = part.match(
          /FOREIGN\s+KEY\s*\(([^)]+)\)\s*REFERENCES\s+(\w+)\s*\(([^)]+)\)/i,
        );
        if (fkMatch) {
          relations.push({
            from: name,
            fromColumn: fkMatch[1].replace(/[`"']/g, "").trim(),
            to: fkMatch[2],
            toColumn: fkMatch[3].replace(/[`"']/g, "").trim(),
          });
        }
        continue;
      }
      if (/^(PRIMARY|UNIQUE|CHECK|CONSTRAINT|KEY|INDEX)/i.test(part)) {
        continue;
      }
      const tokens = part.split(/\s+/);
      const colName = tokens[0].replace(/[`"']/g, "");
      const colType = tokens.slice(1).join(" ").trim();
      if (colName.length > 0) {
        columns.push({ name: colName, type: colType });
      }
    }

    tables.push({ name, columns });
  }

  return { tables, relations };
}