"use client";

import { useState } from "react";
import { formatSql, minifySql } from "../lib/sql";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CopyButton } from "@/components/shared/copy-button";

export function SqlFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleFormat = () => {
    try {
      setOutput(formatSql(input));
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid SQL.");
      setOutput("");
    }
  };

  const handleMinify = () => {
    try {
      setOutput(minifySql(input));
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid SQL.");
      setOutput("");
    }
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setError(null);
  };

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 p-6">
      <section className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          SQL Formatter
        </h1>
        <p className="text-sm text-muted-foreground">
          Format and minify SQL locally.
        </p>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="sql-input" className="text-sm font-medium text-foreground">
            Input
          </label>
          <Textarea
            id="sql-input"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="select * from users where id = 1"
            className="min-h-[320px] font-mono text-sm"
            spellCheck={false}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="sql-output" className="text-sm font-medium text-foreground">
            Output
          </label>
          <Textarea
            id="sql-output"
            value={output}
            readOnly
            placeholder="Result will appear here..."
            className="min-h-[320px] font-mono text-sm"
            spellCheck={false}
          />
        </div>
      </section>

      <section className="flex flex-wrap items-center gap-2">
        <Button onClick={handleFormat}>Format</Button>
        <Button variant="secondary" onClick={handleMinify}>
          Minify
        </Button>
        <div className="ml-auto flex items-center gap-2">
          <CopyButton value={output} />
          <Button variant="ghost" onClick={handleClear}>
            Clear
          </Button>
        </div>
      </section>

      {error ? (
        <div
          role="alert"
          className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive"
        >
          {error}
        </div>
      ) : null}
    </div>
  );
}

export default SqlFormatter;