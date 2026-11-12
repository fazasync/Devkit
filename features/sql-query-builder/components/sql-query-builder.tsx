"use client";

import { useState } from "react";
import { buildQuery, type QueryBuilderInput } from "../lib/sql-builder";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { CopyButton } from "@/components/shared/copy-button";

export function SqlQueryBuilder() {
  const [columns, setColumns] = useState("*");
  const [table, setTable] = useState("");
  const [where, setWhere] = useState("");
  const [groupBy, setGroupBy] = useState("");
  const [orderBy, setOrderBy] = useState("");
  const [limit, setLimit] = useState("");
  const [distinct, setDistinct] = useState(false);
  const input: QueryBuilderInput = {
    columns,
    table,
    where,
    groupBy,
    orderBy,
    limit,
    distinct,
  };

  let output = "";
  try {
    output = buildQuery(input);
  } catch {
    output = "";
  }

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 p-6">
      <section className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          SQL Query Builder
        </h1>
        <p className="text-sm text-muted-foreground">
          Build SQL queries visually.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <label className="w-24 text-sm font-medium text-foreground">Columns</label>
          <Input value={columns} onChange={(e) => setColumns(e.target.value)} placeholder="* or col1, col2" />
        </div>
        <div className="flex items-center gap-2">
          <label className="w-24 text-sm font-medium text-foreground">Table</label>
          <Input value={table} onChange={(e) => setTable(e.target.value)} placeholder="users" />
        </div>
        <div className="flex items-center gap-2">
          <label className="w-24 text-sm font-medium text-foreground">WHERE</label>
          <Input value={where} onChange={(e) => setWhere(e.target.value)} placeholder="id = 1" />
        </div>
        <div className="flex items-center gap-2">
          <label className="w-24 text-sm font-medium text-foreground">GROUP BY</label>
          <Input value={groupBy} onChange={(e) => setGroupBy(e.target.value)} placeholder="status" />
        </div>
        <div className="flex items-center gap-2">
          <label className="w-24 text-sm font-medium text-foreground">ORDER BY</label>
          <Input value={orderBy} onChange={(e) => setOrderBy(e.target.value)} placeholder="created_at DESC" />
        </div>
        <div className="flex items-center gap-2">
          <label className="w-24 text-sm font-medium text-foreground">LIMIT</label>
          <Input value={limit} onChange={(e) => setLimit(e.target.value)} placeholder="10" />
        </div>
        <label className="flex items-center gap-2 text-sm">
          <Checkbox checked={distinct} onCheckedChange={(v) => setDistinct(v === true)} />
          DISTINCT
        </label>
      </section>

      <section className="flex flex-col gap-2">
        <label className="text-sm font-medium text-foreground">Output</label>
        <div className="flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2">
          <pre className="flex-1 whitespace-pre-wrap font-mono text-sm text-foreground">
            {output || "Enter a table name..."}
          </pre>
          <CopyButton value={output} label="Copy" />
        </div>
      </section>
    </div>
  );
}

export default SqlQueryBuilder;