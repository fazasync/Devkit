"use client";

import { useState } from "react";
import { parseUserAgent } from "../lib/ua";
import { Textarea } from "@/components/ui/textarea";

export function UserAgentParser() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<ReturnType<typeof parseUserAgent> | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleParse = () => {
    try {
      setResult(parseUserAgent(input));
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
          User-Agent Parser
        </h1>
        <p className="text-sm text-muted-foreground">
          Parse user-agent strings locally.
        </p>
      </section>

      <section className="flex flex-col gap-2">
        <label htmlFor="ua-input" className="text-sm font-medium text-foreground">
          User-Agent
        </label>
        <Textarea
          id="ua-input"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Mozilla/5.0 ..."
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
          {(["browser", "os", "device"] as const).map((key) => (
            <div
              key={key}
              className="flex items-center gap-3 rounded-md border border-border bg-card px-3 py-2"
            >
              <span className="w-20 text-xs font-medium text-muted-foreground">
                {key}
              </span>
              <span className="text-sm text-foreground">{result[key]}</span>
            </div>
          ))}
        </section>
      ) : null}
    </div>
  );
}

export default UserAgentParser;