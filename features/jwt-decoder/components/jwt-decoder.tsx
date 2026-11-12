"use client";

import { useState } from "react";
import { AlertTriangle, ShieldAlert } from "lucide-react";
import { decodeJwt, formatClaimDate } from "../lib/jwt";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CopyButton } from "@/components/shared/copy-button";

export function JwtDecoder() {
  const [input, setInput] = useState("");
  const [header, setHeader] = useState("");
  const [payload, setPayload] = useState("");
  const [signature, setSignature] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [decodedPayload, setDecodedPayload] = useState<unknown>(null);

  const handleDecode = () => {
    try {
      const result = decodeJwt(input);
      setHeader(JSON.stringify(result.header, null, 2));
      setPayload(JSON.stringify(result.payload, null, 2));
      setSignature(result.signature);
      setDecodedPayload(result.payload);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Decoding failed.");
      setHeader("");
      setPayload("");
      setSignature("");
      setDecodedPayload(null);
    }
  };

  const handleClear = () => {
    setInput("");
    setHeader("");
    setPayload("");
    setSignature("");
    setDecodedPayload(null);
    setError(null);
  };

  const claimDates =
    decodedPayload && typeof decodedPayload === "object"
      ? (["exp", "iat", "nbf"] as const)
          .map((key) => {
            const value = (decodedPayload as Record<string, unknown>)[key];
            const formatted = formatClaimDate(value);
            return formatted ? `${key}: ${formatted}` : null;
          })
          .filter(Boolean)
      : [];

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 p-6">
      <section className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          JWT Decoder
        </h1>
        <p className="text-sm text-muted-foreground">
          Decode and inspect JSON Web Tokens locally.
        </p>
      </section>

      <div className="flex items-start gap-3 rounded-md border border-warning/40 bg-warning/10 px-3 py-2 text-sm text-foreground">
        <ShieldAlert className="mt-0.5 size-4 shrink-0 text-warning" />
        <p>
          This tool only decodes the token. It does <strong>not</strong> verify the
          signature. Do not trust decoded content for security decisions.
        </p>
      </div>

      <section className="flex flex-col gap-2">
        <label htmlFor="jwt-input" className="text-sm font-medium text-foreground">
          Token
        </label>
        <Textarea
          id="jwt-input"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="eyJhbGciOi..."
          className="min-h-[120px] font-mono text-sm"
          spellCheck={false}
        />
      </section>

      <section className="flex flex-wrap items-center gap-2">
        <Button onClick={handleDecode}>Decode</Button>
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

      {header || payload ? (
        <section className="grid gap-4 lg:grid-cols-2">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-foreground">Header</label>
              <CopyButton value={header} />
            </div>
            <Textarea
              value={header}
              readOnly
              className="min-h-[180px] font-mono text-sm"
              spellCheck={false}
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-foreground">Payload</label>
              <CopyButton value={payload} />
            </div>
            <Textarea
              value={payload}
              readOnly
              className="min-h-[180px] font-mono text-sm"
              spellCheck={false}
            />
          </div>
        </section>
      ) : null}

      {signature ? (
        <section className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-foreground">Signature</label>
            <CopyButton value={signature} />
          </div>
          <Textarea
            value={signature}
            readOnly
            className="min-h-[60px] font-mono text-sm"
            spellCheck={false}
          />
        </section>
      ) : null}

      {claimDates.length > 0 ? (
        <section className="flex flex-col gap-1">
          <h2 className="text-sm font-medium text-foreground">Claim dates (UTC)</h2>
          <ul className="text-sm text-muted-foreground">
            {claimDates.map((entry) => (
              <li key={entry}>{entry}</li>
            ))}
          </ul>
        </section>
      ) : null}

      <div className="flex items-start gap-3 rounded-md border border-border bg-muted/40 px-3 py-2 text-xs text-muted-foreground">
        <AlertTriangle className="mt-0.5 size-3.5 shrink-0" />
        <p>
          Decoded content is shown for inspection only. Never use this tool to
          validate authentication or authorization.
        </p>
      </div>
    </div>
  );
}

export default JwtDecoder;