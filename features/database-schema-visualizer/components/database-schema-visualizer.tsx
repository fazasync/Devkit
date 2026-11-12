"use client";

import { useState } from "react";
import { parseSchema, type TableDef } from "../lib/schema";
import { Textarea } from "@/components/ui/textarea";

export function DatabaseSchemaVisualizer() {
  const [input, setInput] = useState("");
  const [tables, setTables] = useState<TableDef[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleParse = () => {
    try {
      setTables(parseSchema(input));
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Parsing failed.");
      setTables([]);
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 p-6">
      <section className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Database Schema Visualizer
        </h1>
        <p className="text-sm text-muted-foreground">
          Visualize database schemas from CREATE TABLE statements.
        </p>
      </section>

      <section className="flex flex-col gap-2">
        <label htmlFor="schema-input" className="text-sm font-medium text-foreground">
          SQL DDL
        </label>
        <Textarea
          id="schema-input"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="CREATE TABLE users (id INT PRIMARY KEY, name VARCHAR(100));"
          className="min-h-[200px] font-mono text-sm"
          spellCheck={false}
        />
      </section>

      <button
        type="button"
        onClick={handleParse}
        className="w-fit rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
      >
        Parse
      </button>

      {error ? (
        <div
          role="alert"
          className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive"
        >
          {error}
        </div>
      ) : null}

      {tables.length > 0 ? (
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tables.map((table) => (
            <div
              key={table.name}
              className="rounded-lg border border-border bg-card p-4"
            >
              <h2 className="mb-2 font-mono text-sm font-semibold text-foreground">
                {table.name}
              </h2>
              <div className="flex flex-col gap-1">
                {table.columns.map((col) => (
                  <div
                    key={col.name}
                    className="flex items-center justify-between text-xs"
                  >
                    <span className="font-mono text-foreground">{col.name}</span>
                    <span className="text-muted-foreground">{col.type}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>
      ) : null}
    </div>
  );
}

export default DatabaseSchemaVisualizer;