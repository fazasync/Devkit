"use client";

import { useState } from "react";
import { ArrowLeftRight } from "lucide-react";
import { encodeUrlComponent, decodeUrlComponent } from "../lib/url";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CopyButton } from "@/components/shared/copy-button";

type Mode = "encode" | "decode";

export function UrlTool() {
  const [mode, setMode] = useState<Mode>("encode");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleConvert = () => {
    try {
      const result =
        mode === "encode" ? encodeUrlComponent(input) : decodeUrlComponent(input);
      setOutput(result);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Conversion failed.");
      setOutput("");
    }
  };

  const handleSwap = () => {
    setInput(output);
    setOutput("");
    setError(null);
    setMode(mode === "encode" ? "decode" : "encode");
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
          URL Encoder/Decoder
        </h1>
        <p className="text-sm text-muted-foreground">
          Encode and decode URL components locally.
        </p>
      </section>

      <section className="flex gap-2">
        <Button
          variant={mode === "encode" ? "default" : "outline"}
          onClick={() => setMode("encode")}
        >
          Encode
        </Button>
        <Button
          variant={mode === "decode" ? "default" : "outline"}
          onClick={() => setMode("decode")}
        >
          Decode
        </Button>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="url-input" className="text-sm font-medium text-foreground">
            Input
          </label>
          <Textarea
            id="url-input"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder={mode === "encode" ? "Plain text" : "URL-encoded string"}
            className="min-h-[220px] font-mono text-sm"
            spellCheck={false}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="url-output" className="text-sm font-medium text-foreground">
            Output
          </label>
          <Textarea
            id="url-output"
            value={output}
            readOnly
            placeholder="Result will appear here..."
            className="min-h-[220px] font-mono text-sm"
            spellCheck={false}
          />
        </div>
      </section>

      <section className="flex flex-wrap items-center gap-2">
        <Button onClick={handleConvert}>
          {mode === "encode" ? "Encode" : "Decode"}
        </Button>
        <Button variant="outline" onClick={handleSwap}>
          <ArrowLeftRight className="size-4" />
          Swap
        </Button>
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

export default UrlTool;