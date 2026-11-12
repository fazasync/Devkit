"use client";

import { useState } from "react";
import { convertCase, type CaseType } from "../lib/case";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CopyButton } from "@/components/shared/copy-button";

const CASES: { value: CaseType; label: string }[] = [
  { value: "lower", label: "lower case" },
  { value: "upper", label: "UPPER CASE" },
  { value: "title", label: "Title Case" },
  { value: "sentence", label: "Sentence case" },
  { value: "camel", label: "camelCase" },
  { value: "pascal", label: "PascalCase" },
  { value: "snake", label: "snake_case" },
  { value: "kebab", label: "kebab-case" },
  { value: "constant", label: "CONSTANT_CASE" },
];

export function CaseConverter() {
  const [input, setInput] = useState("");
  const [type, setType] = useState<CaseType>("camel");
  const output = input.length === 0 ? "" : convertCase(input, type);

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 p-6">
      <section className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Case Converter
        </h1>
        <p className="text-sm text-muted-foreground">
          Convert text between different cases locally.
        </p>
      </section>

      <section className="flex flex-col gap-2">
        <label htmlFor="case-input" className="text-sm font-medium text-foreground">
          Input
        </label>
        <Textarea
          id="case-input"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="hello world"
          className="min-h-[120px] font-mono text-sm"
          spellCheck={false}
        />
      </section>

      <section className="flex flex-wrap gap-2">
        {CASES.map((c) => (
          <Button
            key={c.value}
            variant={type === c.value ? "default" : "outline"}
            size="sm"
            onClick={() => setType(c.value)}
          >
            {c.label}
          </Button>
        ))}
      </section>

      <section className="flex flex-col gap-2">
        <label className="text-sm font-medium text-foreground">Output</label>
        <div className="flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2">
          <code className="flex-1 break-all font-mono text-sm text-foreground">
            {output}
          </code>
          <CopyButton value={output} label="Copy" />
        </div>
      </section>
    </div>
  );
}

export default CaseConverter;