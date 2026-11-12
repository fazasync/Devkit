"use client";

import { useState } from "react";
import { Copy, RefreshCw } from "lucide-react";
import { generateNanoIds } from "../lib/nanoid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export function NanoIdGenerator() {
  const [size, setSize] = useState(21);
  const [count, setCount] = useState(1);
  const [ids, setIds] = useState<string[]>([]);

  const handleGenerate = () => {
    setIds(generateNanoIds(count, size));
  };

  const handleCopyAll = async () => {
    if (ids.length === 0) return;
    try {
      await navigator.clipboard.writeText(ids.join("\n"));
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
          Nano ID Generator
        </h1>
        <p className="text-sm text-muted-foreground">
          Generate Nano IDs locally.
        </p>
      </section>

      <section className="flex flex-wrap items-end gap-3">
        <div className="flex flex-col gap-1">
          <label htmlFor="nanoid-size" className="text-xs text-muted-foreground">
            Size
          </label>
          <Input
            id="nanoid-size"
            type="number"
            min={1}
            max={256}
            value={size}
            onChange={(event) => setSize(Number(event.target.value))}
            className="w-20"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="nanoid-count" className="text-xs text-muted-foreground">
            Count
          </label>
          <Input
            id="nanoid-count"
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
        <Button variant="outline" onClick={handleCopyAll} disabled={ids.length === 0}>
          <Copy className="size-4" />
          Copy all
        </Button>
      </section>

      {ids.length > 0 ? (
        <section className="flex flex-col gap-2">
          {ids.map((id, index) => (
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

export default NanoIdGenerator;