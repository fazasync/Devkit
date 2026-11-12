"use client";

import { useState } from "react";
import { RefreshCw } from "lucide-react";
import { generatePassword } from "../lib/password";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { CopyButton } from "@/components/shared/copy-button";

export function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = () => {
    try {
      setPassword(
        generatePassword({ length, uppercase, lowercase, numbers, symbols }),
      );
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Generation failed.");
      setPassword("");
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-6 p-6">
      <section className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Password Generator
        </h1>
        <p className="text-sm text-muted-foreground">
          Generate secure passwords locally.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <label htmlFor="pw-length" className="text-sm font-medium text-foreground">
            Length
          </label>
          <Input
            id="pw-length"
            type="number"
            min={4}
            max={128}
            value={length}
            onChange={(event) => setLength(Number(event.target.value))}
            className="w-20"
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <label className="flex items-center gap-2 text-sm">
            <Checkbox
              checked={uppercase}
              onCheckedChange={(v) => setUppercase(v === true)}
            />
            Uppercase (A-Z)
          </label>
          <label className="flex items-center gap-2 text-sm">
            <Checkbox
              checked={lowercase}
              onCheckedChange={(v) => setLowercase(v === true)}
            />
            Lowercase (a-z)
          </label>
          <label className="flex items-center gap-2 text-sm">
            <Checkbox
              checked={numbers}
              onCheckedChange={(v) => setNumbers(v === true)}
            />
            Numbers (0-9)
          </label>
          <label className="flex items-center gap-2 text-sm">
            <Checkbox
              checked={symbols}
              onCheckedChange={(v) => setSymbols(v === true)}
            />
            Symbols
          </label>
        </div>

        <Button onClick={handleGenerate}>
          <RefreshCw className="size-4" />
          Generate
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

      {password ? (
        <section className="flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2">
          <code className="flex-1 break-all font-mono text-sm text-foreground">
            {password}
          </code>
          <CopyButton value={password} label="Copy" />
        </section>
      ) : null}
    </div>
  );
}

export default PasswordGenerator;