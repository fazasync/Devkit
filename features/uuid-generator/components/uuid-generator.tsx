"use client";

import { useState } from "react";
import { Copy, RefreshCw } from "lucide-react";
import { generateUuids } from "../lib/uuid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export function UuidGenerator() {
  const [count, setCount] = useState(1);
  const [uuids, setUuids] = useState<string[]>([]);

  const handleGenerate = () => {
    setUuids(generateUuids(count));
  };

  const handleCopyAll = async () => {
    if (uuids.length === 0) return;
    try {
      await navigator.clipboard.writeText(uuids.join("\n"));
      toast.success("Copied to clipboard");
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
          UUID Generator
        </h1>
        <p className="text-sm text-muted-foreground">
          Generate version 4 UUIDs locally.
        </p>
      </section>

      <section className="flex flex-wrap items-end gap-3">
        <div className="flex flex-col gap-1">
          <label htmlFor="uuid-count" className="text-xs text-muted-foreground">
            Count
          </label>
          <Input
            id="uuid-count"
            type="number"
            min={1}
            max={100}
            value={count}
            onChange={(event) => setCount(Number(event.target.value))}
            className="w-24"
          />
        </div>
        <Button onClick={handleGenerate}>
          <RefreshCw className="size-4" />
          Generate
        </Button>
        <Button variant="outline" onClick={handleCopyAll} disabled={uuids.length === 0}>
          <Copy className="size-4" />
          Copy all
        </Button>
      </section>

      {uuids.length > 0 ? (
        <section className="flex flex-col gap-2">
          {uuids.map((uuid, index) => (
            <div
              key={`${uuid}-${index}`}
              className="flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2"
            >
              <code className="flex-1 font-mono text-sm text-foreground">{uuid}</code>
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => handleCopyOne(uuid)}
                aria-label="Copy UUID"
              >
                <Copy className="size-3.5" />
              </Button>
            </div>
          ))}
        </section>
      ) : (
        <p className="text-sm text-muted-foreground">
          Click Generate to create UUIDs.
        </p>
      )}
    </div>
  );
}

export default UuidGenerator;