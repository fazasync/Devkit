"use client";

import { useState } from "react";
import { parseUrl, type ParsedUrl } from "../lib/url-parser";
import { Input } from "@/components/ui/input";

export function UrlParser() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<ParsedUrl | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleParse = () => {
    try {
      setResult(parseUrl(input));
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Parsing failed.");
      setResult(null);
    }
  };

  const rows: [string, string][] = result
    ? [
        ["href", result.href],
        ["protocol", result.protocol],
        ["host", result.host],
        ["hostname", result.hostname],
        ["port", result.port || "(none)"],
        ["pathname", result.pathname],
        ["search", result.search || "(none)"],
        ["hash", result.hash || "(none)"],
      ]
    : [];

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 p-6">
      <section className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          URL Parser
        </h1>
        <p className="text-sm text-muted-foreground">
          Parse URLs into components locally.
        </p>
      </section>

      <section className="flex gap-2">
        <Input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="https://example.com:8080/path?q=1#frag"
          className="font-mono text-sm"
        />
        <button
          type="button"
          onClick={handleParse}
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
        >
          Parse
        </button>
      </section>

      {error ? (
        <div
          role="alert"
          className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive"
        >
          {error}
        </div>
      ) : null}

      {result ? (
        <section className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            {rows.map(([key, value]) => (
              <div
                key={key}
                className="flex items-start gap-3 rounded-md border border-border bg-card px-3 py-2"
              >
                <span className="w-24 shrink-0 text-xs font-medium text-muted-foreground">
                  {key}
                </span>
                <code className="break-all font-mono text-sm text-foreground">
                  {value}
                </code>
              </div>
            ))}
          </div>
          {result.params.length > 0 ? (
            <div className="flex flex-col gap-1">
              <h2 className="text-sm font-medium text-foreground">Query params</h2>
              {result.params.map((p, i) => (
                <div
                  key={`${p.key}-${i}`}
                  className="flex items-center gap-3 rounded-md border border-border bg-card px-3 py-2"
                >
                  <code className="font-mono text-sm text-foreground">{p.key}</code>
                  <span className="text-muted-foreground">=</span>
                  <code className="break-all font-mono text-sm text-foreground">
                    {p.value}
                  </code>
                </div>
              ))}
            </div>
          ) : null}
        </section>
      ) : null}
    </div>
  );
}

export default UrlParser;