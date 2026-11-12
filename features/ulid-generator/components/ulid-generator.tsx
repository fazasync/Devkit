"use client";

import { useState } from "react";
import { Copy, RefreshCw } from "lucide-react";
import { generateUlids } from "../lib/ulid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export function UlidGenerator() {
  const [count, setCount] = useState(1);
  const [ulids, setUlids] = useState<string[]>([]);

  const handleGenerate = () => {
    setUlids(generateUlids(count));
  };

  const handleCopyAll = async () => {
    if (ulids.length === 0) return;
    try {
      await navigator.clipboard.writeText(ulids.join("\n"));
      toast.success("Copied");
    } catch {
      toast.error("Failed to copy");
    }
  };

  const handleCopyOne = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      toast.success("Copied");
    } catch {
      toast.error("Failed to copy");
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 p-6">
      <section className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          ULID Generator
        </h1>
        <p className="text-sm text-muted-foreground">
          Generate ULIDs locally.
        </p>
      </section>

      <section className="flex flex-wrap items-end gap-3">
        <div className="flex flex-col gap-1">
          <label htmlFor="ulid-count" className="text-xs text-muted-foreground">
            Count
          </label>
          <Input
            id="ulid-count"
            type="number"
            min={1}
            max={100}
            value={count}
            onChange={(event) => setCount(Number(event.target.value))}
            className="w-20"
          />
        </div>
        <Button onClick={handleGenerate}>
          <RefreshCw className="size-4" />
          Generate
        </Button>
        <Button variant="outline" onClick={handleCopyAll} disabled={ulids.length === 0}>
          <Copy className="size-4" />
          Copy all
        </Button>
      </section>

      {ulids.length > 0 ? (
        <section className="flex flex-col gap-2">
          {ulids.map((id, index) => (
            <div
              key={`${id}-${index}`}
              className="flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2"
            >
              <code className="flex-1 break-all font-mono text-sm text-foreground">
                {id}
              </code>
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => handleCopyOne(id)}
                aria-label="Copy"
              >
                <Copy className="size-3.5" />
              </Button>
            </div>
          ))}
        </section>
      ) : (
        <p className="text-sm text-muted-foreground">Click Generate.</p>
      )}
    </div>
  );
}

export default UlidGenerator;