"use client";

import { useEffect, useState } from "react";
import { computeHmac, type HmacAlgorithm } from "../lib/hmac";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { CopyButton } from "@/components/shared/copy-button";

export function HmacGenerator() {
  const [message, setMessage] = useState("");
  const [secret, setSecret] = useState("");
  const [algorithm, setAlgorithm] = useState<HmacAlgorithm>("SHA-256");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    if (message.length === 0 || secret.length === 0) {
      return;
    }
    computeHmac(message, secret, algorithm)
      .then((result) => {
        if (!cancelled) {
          setOutput(result);
          setError(null);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "HMAC failed.");
          setOutput("");
        }
      });
    return () => {
      cancelled = true;
    };
  }, [message, secret, algorithm]);

  const displayOutput = message.length === 0 || secret.length === 0 ? "" : output;
  const displayError = message.length === 0 || secret.length === 0 ? null : error;

  const handleClear = () => {
    setMessage("");
    setSecret("");
    setOutput("");
    setError(null);
  };

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 p-6">
      <section className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          HMAC Generator
        </h1>
        <p className="text-sm text-muted-foreground">
          Generate HMAC signatures locally.
        </p>
      </section>

      <section className="flex flex-col gap-2">
        <label htmlFor="hmac-message" className="text-sm font-medium text-foreground">
          Message
        </label>
        <Textarea
          id="hmac-message"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Message..."
          className="min-h-[120px] font-mono text-sm"
          spellCheck={false}
        />
      </section>

      <section className="flex flex-col gap-2">
        <label htmlFor="hmac-secret" className="text-sm font-medium text-foreground">
          Secret
        </label>
        <Input
          id="hmac-secret"
          value={secret}
          onChange={(event) => setSecret(event.target.value)}
          placeholder="Secret key"
          className="font-mono text-sm"
        />
      </section>

      <section className="flex items-center gap-3">
        <label htmlFor="hmac-alg" className="text-sm font-medium text-foreground">
          Algorithm
        </label>
        <select
          id="hmac-alg"
          value={algorithm}
          onChange={(event) => setAlgorithm(event.target.value as HmacAlgorithm)}
          className="h-9 rounded-md border border-border bg-background px-2 text-sm"
        >
          {(["SHA-1", "SHA-256", "SHA-384", "SHA-512"] as HmacAlgorithm[]).map(
            (alg) => (
              <option key={alg} value={alg}>
                {alg}
              </option>
            ),
          )}
        </select>
        <Button variant="ghost" onClick={handleClear}>
          Clear
        </Button>
      </section>

      {displayError ? (
        <div
          role="alert"
          className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive"
        >
          {displayError}
        </div>
      ) : null}

      {displayOutput ? (
        <section className="flex flex-col gap-2">
          <label className="text-sm font-medium text-foreground">HMAC (hex)</label>
          <div className="flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2">
            <code className="flex-1 break-all font-mono text-sm text-foreground">
              {displayOutput}
            </code>
            <CopyButton value={displayOutput} label="Copy" />
          </div>
        </section>
      ) : null}
    </div>
  );
}

export default HmacGenerator;