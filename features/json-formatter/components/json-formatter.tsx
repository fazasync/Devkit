"use client";

import { useState } from "react";
import { formatJson, minifyJson, validateJson } from "../lib/json";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CopyButton } from "@/components/shared/copy-button";
import { EmptyState } from "@/components/shared/empty-state";
import { Construction } from "lucide-react";

export function JsonFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [indent, setIndent] = useState(2);

  const handleFormat = () => {
    try {
      setOutput(formatJson(input, indent));
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid JSON.");
      setOutput("");
    }
  };

  const handleMinify = () => {
    try {
      setOutput(minifyJson(input));
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid JSON.");
      setOutput("");
    }
  };

  const handleValidate = () => {
    const result = validateJson(input);
    if (result.ok) {
      setError(null);
      setOutput("Valid JSON.");
    } else {
      setError(result.error);
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
          JSON Formatter
        </h1>
        <p className="text-sm text-muted-foreground">
          Format, minify, and validate JSON locally.
        </p>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="json-input" className="text-sm font-medium text-foreground">
            Input
          </label>
          <Textarea
            id="json-input"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder='{"hello":"world"}'
            className="min-h-[320px] font-mono text-sm"
            spellCheck={false}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="json-output" className="text-sm font-medium text-foreground">
            Output
          </label>
          <Textarea
            id="json-output"
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
        <Button variant="outline" onClick={handleValidate}>
          Validate
        </Button>
        <div className="flex items-center gap-2">
          <label htmlFor="indent" className="text-xs text-muted-foreground">
            Indent
          </label>
          <select
            id="indent"
            value={indent}
            onChange={(event) => setIndent(Number(event.target.value))}
            className="h-9 rounded-md border border-border bg-background px-2 text-sm"
          >
            <option value={2}>2 spaces</option>
            <option value={4}>4 spaces</option>
            <option value={1}>1 space</option>
          </select>
        </div>
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

export default JsonFormatter;