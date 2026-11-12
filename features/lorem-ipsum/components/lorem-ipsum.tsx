"use client";

import { useState } from "react";
import {
  generateLoremParagraphs,
  generateLoremSentences,
  generateLoremWords,
} from "../lib/lorem";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CopyButton } from "@/components/shared/copy-button";

type Mode = "paragraphs" | "sentences" | "words";

export function LoremIpsum() {
  const [mode, setMode] = useState<Mode>("paragraphs");
  const [count, setCount] = useState(3);
  const [output, setOutput] = useState("");

  const handleGenerate = () => {
    const n = Math.max(1, Math.floor(count));
    if (mode === "paragraphs") setOutput(generateLoremParagraphs(n));
    else if (mode === "sentences") setOutput(generateLoremSentences(n));
    else setOutput(generateLoremWords(n));
  };

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 p-6">
      <section className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Lorem Ipsum Generator
        </h1>
        <p className="text-sm text-muted-foreground">
          Generate placeholder text locally.
        </p>
      </section>

      <section className="flex flex-wrap items-end gap-3">
        <div className="flex gap-2">
          {(["paragraphs", "sentences", "words"] as Mode[]).map((m) => (
            <Button
              key={m}
              variant={mode === m ? "default" : "outline"}
              size="sm"
              onClick={() => setMode(m)}
            >
              {m}
            </Button>
          ))}
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="lorem-count" className="text-xs text-muted-foreground">
            Count
          </label>
          <Input
            id="lorem-count"
            type="number"
            min={1}
            value={count}
            onChange={(event) => setCount(Number(event.target.value))}
            className="w-20"
          />
        </div>
        <Button onClick={handleGenerate}>Generate</Button>
      </section>

      <section className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-foreground">Output</label>
          <CopyButton value={output} label="Copy" />
        </div>
        <Textarea
          value={output}
          readOnly
          className="min-h-[240px] text-sm"
          spellCheck={false}
        />
      </section>
    </div>
  );
}

export default LoremIpsum;