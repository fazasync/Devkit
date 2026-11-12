"use client";

import { useState } from "react";
import { diffLines, type DiffLine } from "../lib/diff";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export function TextDiff() {
  const [left, setLeft] = useState("");
  const [right, setRight] = useState("");
  const [result, setResult] = useState<DiffLine[] | null>(null);

  const handleCompare = () => {
    setResult(diffLines(left, right));
  };

  const handleClear = () => {
    setLeft("");
    setRight("");
    setResult(null);
  };

  const stats = result
    ? {
        added: result.filter((l) => l.type === "added").length,
        removed: result.filter((l) => l.type === "removed").length,
      }
    : null;

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 p-6">
      <section className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Text Diff
        </h1>
        <p className="text-sm text-muted-foreground">
          Compare two texts locally.
        </p>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="diff-left" className="text-sm font-medium text-foreground">
            Original
          </label>
          <Textarea
            id="diff-left"
            value={left}
            onChange={(event) => setLeft(event.target.value)}
            placeholder="Original text..."
            className="min-h-[240px] font-mono text-sm"
            spellCheck={false}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="diff-right" className="text-sm font-medium text-foreground">
            Modified
          </label>
          <Textarea
            id="diff-right"
            value={right}
            onChange={(event) => setRight(event.target.value)}
            placeholder="Modified text..."
            className="min-h-[240px] font-mono text-sm"
            spellCheck={false}
          />
        </div>
      </section>

      <section className="flex flex-wrap items-center gap-2">
        <Button onClick={handleCompare}>Compare</Button>
        <Button variant="ghost" onClick={handleClear}>
          Clear
        </Button>
        {stats ? (
          <span className="ml-auto text-sm text-muted-foreground">
            +{stats.added} / -{stats.removed}
          </span>
        ) : null}
      </section>

      {result ? (
        <section className="flex flex-col gap-2">
          <h2 className="text-sm font-medium text-foreground">Result</h2>
          <pre className="overflow-auto rounded-md border border-border bg-card p-3 font-mono text-sm">
            {result.map((line, i) => (
              <div
                key={i}
                className={
                  line.type === "added"
                    ? "bg-success/10 text-success"
                    : line.type === "removed"
                      ? "bg-destructive/10 text-destructive"
                      : "text-foreground"
                }
              >
                <span className="select-none text-muted-foreground">
                  {line.type === "added" ? "+" : line.type === "removed" ? "-" : " "}
                </span>{" "}
                {line.line}
              </div>
            ))}
          </pre>
        </section>
      ) : null}
    </div>
  );
}

export default TextDiff;