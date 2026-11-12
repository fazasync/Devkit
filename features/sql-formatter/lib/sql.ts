const KEYWORDS = [
  "SELECT",
  "FROM",
  "WHERE",
  "GROUP BY",
  "ORDER BY",
  "HAVING",
  "LIMIT",
  "OFFSET",
  "JOIN",
  "INNER JOIN",
  "LEFT JOIN",
  "RIGHT JOIN",
  "FULL JOIN",
  "OUTER JOIN",
  "CROSS JOIN",
  "ON",
  "AND",
  "OR",
  "NOT",
  "IN",
  "IS",
  "NULL",
  "AS",
  "INSERT INTO",
  "VALUES",
  "UPDATE",
  "SET",
  "DELETE FROM",
  "CREATE TABLE",
  "ALTER TABLE",
  "DROP TABLE",
  "DISTINCT",
  "COUNT",
  "SUM",
  "AVG",
  "MIN",
  "MAX",
  "CASE",
  "WHEN",
  "THEN",
  "ELSE",
  "END",
  "UNION",
  "ALL",
  "EXISTS",
];

export function formatSql(input: string): string {
  const trimmed = input.trim();
  if (trimmed.length === 0) {
    throw new Error("Input is empty.");
  }

  let sql = trimmed.replace(/\s+/g, " ");

  // Uppercase keywords (longest first to handle multi-word).
  const sorted = [...KEYWORDS].sort((a, b) => b.length - a.length);
  for (const keyword of sorted) {
    const regex = new RegExp(`\\b${keyword.replace(/\s+/g, "\\s+")}\\b`, "gi");
    sql = sql.replace(regex, keyword);
  }

  // Insert newlines before major clause keywords.
  const clauseKeywords = [
    "SELECT",
    "FROM",
    "WHERE",
    "GROUP BY",
    "ORDER BY",
    "HAVING",
    "LIMIT",
    "OFFSET",
    "JOIN",
    "INNER JOIN",
    "LEFT JOIN",
    "RIGHT JOIN",
    "FULL JOIN",
    "OUTER JOIN",
    "CROSS JOIN",
    "UNION",
    "INSERT INTO",
    "VALUES",
    "UPDATE",
    "SET",
    "DELETE FROM",
    "CREATE TABLE",
    "ALTER TABLE",
    "DROP TABLE",
  ];
  for (const keyword of clauseKeywords.sort((a, b) => b.length - a.length)) {
    const regex = new RegExp(`\\s+(${keyword.replace(/\s+/g, "\\s+")})\\b`, "gi");
    sql = sql.replace(regex, `\n${keyword}`);
  }

  // Indent AND/OR slightly.
  sql = sql.replace(/\n(AND|OR)\b/g, "\n  $1");

  return sql.trim();
}

export function minifySql(input: string): string {
  const trimmed = input.trim();
  if (trimmed.length === 0) {
    throw new Error("Input is empty.");
  }
  return trimmed.replace(/\s+/g, " ");
}