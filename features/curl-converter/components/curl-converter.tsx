"use client";

import { useState } from "react";
import { parseCurl, toFetchCode } from "../lib/curl";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CopyButton } from "@/components/shared/copy-button";

export function CurlConverter() {
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [parsed, setParsed] = useState<ReturnType<typeof parseCurl> | null>(null);
  const [fetchCode, setFetchCode] = useState("");

  const handleConvert = () => {
    try {
      const result = parseCurl(input);
      setParsed(result);
      setFetchCode(toFetchCode(result));
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Parsing failed.");
      setParsed(null);
      setFetchCode("");
    }
  };

  const handleClear = () => {
    setInput("");
    setParsed(null);
    setFetchCode("");
    setError(null);
  };

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 p-6">
      <section className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          cURL Converter
        </h1>
        <p className="text-sm text-muted-foreground">
          Convert cURL commands to fetch code locally.
        </p>
      </section>

      <section className="flex flex-col gap-2">
        <label htmlFor="curl-input" className="text-sm font-medium text-foreground">
          cURL command
        </label>
        <Textarea
          id="curl-input"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder='curl -X POST https://api.example.com/data -H "Content-Type: application/json" -d "{\"a\":1}"'
          className="min-h-[160px] font-mono text-sm"
          spellCheck={false}
        />
      </section>

      <section className="flex flex-wrap items-center gap-2">
        <Button onClick={handleConvert}>Convert</Button>
        <Button variant="ghost" onClick={handleClear}>
          Clear
        </Button>
      </section>

      {error ? (
        <div
          role="alert"
          className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive"
        >
          {error}
        </div>
      ) : null}

      {parsed ? (
        <section className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <h2 className="text-sm font-medium text-foreground">Parsed</h2>
            <div className="rounded-md border border-border bg-card px-3 py-2 text-sm">
              <p>
                <span className="text-muted-foreground">Method:</span>{" "}
                {parsed.method}
              </p>
              <p>
                <span className="text-muted-foreground">URL:</span> {parsed.url}
              </p>
              {parsed.body ? (
                <p>
                  <span className="text-muted-foreground">Body:</span> {parsed.body}
                </p>
              ) : null}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-medium text-foreground">fetch code</h2>
              <CopyButton value={fetchCode} label="Copy" />
            </div>
            <Textarea
              value={fetchCode}
              readOnly
              className="min-h-[200px] font-mono text-sm"
              spellCheck={false}
            />
          </div>
        </section>
      ) : null}
    </div>
  );
}

export default CurlConverter;