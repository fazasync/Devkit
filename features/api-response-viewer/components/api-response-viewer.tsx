"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CopyButton } from "@/components/shared/copy-button";

export function ApiResponseViewer() {
  const [input, setInput] = useState("");
  const [contentType, setContentType] = useState("application/json");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleFormat = () => {
    try {
      if (contentType.includes("json")) {
        setOutput(JSON.stringify(JSON.parse(input), null, 2));
      } else {
        setOutput(input);
      }
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid response.");
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
          API Response Viewer
        </h1>
        <p className="text-sm text-muted-foreground">
          View and format API responses locally.
        </p>
      </section>

      <section className="flex items-center gap-3">
        <label htmlFor="content-type" className="text-sm font-medium text-foreground">
          Content-Type
        </label>
        <select
          id="content-type"
          value={contentType}
          onChange={(event) => setContentType(event.target.value)}
          className="h-9 rounded-md border border-border bg-background px-2 text-sm"
        >
          <option value="application/json">application/json</option>
          <option value="text/plain">text/plain</option>
          <option value="text/xml">text/xml</option>
          <option value="text/html">text/html</option>
        </select>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="resp-input" className="text-sm font-medium text-foreground">
            Response
          </label>
          <Textarea
            id="resp-input"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Paste response body..."
            className="min-h-[320px] font-mono text-sm"
            spellCheck={false}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="resp-output" className="text-sm font-medium text-foreground">
            Formatted
          </label>
          <Textarea
            id="resp-output"
            value={output}
            readOnly
            placeholder="Formatted response..."
            className="min-h-[320px] font-mono text-sm"
            spellCheck={false}
          />
        </div>
      </section>

      <section className="flex flex-wrap items-center gap-2">
        <Button onClick={handleFormat}>Format</Button>
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

export default ApiResponseViewer;