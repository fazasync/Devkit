"use client";

import { useState } from "react";
import { parseConnectionString } from "../lib/connection";
import { Textarea } from "@/components/ui/textarea";

export function ConnectionStringParser() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<ReturnType<typeof parseConnectionString> | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleParse = () => {
    try {
      setResult(parseConnectionString(input));
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Parsing failed.");
      setResult(null);
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 p-6">
      <section className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Connection String Parser
        </h1>
        <p className="text-sm text-muted-foreground">
          Parse database connection strings locally.
        </p>
      </section>

      <section className="flex flex-col gap-2">
        <label htmlFor="conn-input" className="text-sm font-medium text-foreground">
          Connection string
        </label>
        <Textarea
          id="conn-input"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Server=localhost;Database=mydb;User Id=sa;Password=secret;"
          className="min-h-[120px] font-mono text-sm"
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

      {result ? (
        <section className="flex flex-col gap-2">
          {result.map((p, i) => (
            <div
              key={`${p.key}-${i}`}
              className="flex items-center gap-3 rounded-md border border-border bg-card px-3 py-2"
            >
              <code className="w-32 shrink-0 font-mono text-sm text-muted-foreground">
                {p.key}
              </code>
              <code className="break-all font-mono text-sm text-foreground">
                {p.value}
              </code>
            </div>
          ))}
        </section>
      ) : null}
    </div>
  );
}

export default ConnectionStringParser;