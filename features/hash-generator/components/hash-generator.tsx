"use client";

import { useEffect, useState } from "react";
import {
  HASH_ALGORITHMS,
  computeHash,
  type HashAlgorithm,
} from "../lib/hash";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CopyButton } from "@/components/shared/copy-button";

export function HashGenerator() {
  const [input, setInput] = useState("");
  const [algorithm, setAlgorithm] = useState<HashAlgorithm>("SHA-256");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    if (input.length === 0) {
      setOutput("");
      setError(null);
      return;
    }
    computeHash(input, algorithm)
      .then((result) => {
        if (!cancelled) {
          setOutput(result);
          setError(null);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Hashing failed.");
          setOutput("");
        }
      });
    return () => {
      cancelled = true;
    };
  }, [input, algorithm]);

  const handleClear = () => {
    setInput("");
    setOutput("");
    setError(null);
  };

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 p-6">
      <section className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Hash Generator
        </h1>
        <p className="text-sm text-muted-foreground">
          Generate cryptographic hashes locally.
        </p>
      </section>

      <section className="flex flex-col gap-2">
        <label htmlFor="hash-input" className="text-sm font-medium text-foreground">
          Input
        </label>
        <Textarea
          id="hash-input"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Enter text to hash..."
          className="min-h-[160px] font-mono text-sm"
          spellCheck={false}
        />
      </section>

      <section className="flex items-center gap-3">
        <label htmlFor="hash-alg" className="text-sm font-medium text-foreground">
          Algorithm
        </label>
        <select
          id="hash-alg"
          value={algorithm}
          onChange={(event) => setAlgorithm(event.target.value as HashAlgorithm)}
          className="h-9 rounded-md border border-border bg-background px-2 text-sm"
        >
          {HASH_ALGORITHMS.map((alg) => (
            <option key={alg} value={alg}>
              {alg}
            </option>
          ))}
        </select>
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

      {output ? (
        <section className="flex flex-col gap-2">
          <label className="text-sm font-medium text-foreground">Output</label>
          <div className="flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2">
            <code className="flex-1 break-all font-mono text-sm text-foreground">
              {output}
            </code>
            <CopyButton value={output} label="Copy" />
          </div>
        </section>
      ) : null}
    </div>
  );
}

export default HashGenerator;