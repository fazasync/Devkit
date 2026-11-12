"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CopyButton } from "@/components/shared/copy-button";

export function QrCodeGenerator() {
  const [text, setText] = useState("");
  const [dataUrl, setDataUrl] = useState("");
  const [error, setError] = useState<string | null>(null);

  const displayDataUrl = text.trim().length === 0 ? "" : dataUrl;
  const displayError = text.trim().length === 0 ? null : error;

  useEffect(() => {
    let cancelled = false;
    if (text.trim().length === 0) {
      return;
    }
    QRCode.toDataURL(text, { width: 256, margin: 1 })
      .then((url) => {
        if (!cancelled) {
          setDataUrl(url);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Generation failed.");
          setDataUrl("");
        }
      });
    return () => {
      cancelled = true;
    };
  }, [text]);

  const handleDownload = () => {
    if (!displayDataUrl) return;
    const link = document.createElement("a");
    link.href = displayDataUrl;
    link.download = "qrcode.png";
    link.click();
  };

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-6 p-6">
      <section className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          QR Code Generator
        </h1>
        <p className="text-sm text-muted-foreground">
          Generate QR codes locally.
        </p>
      </section>

      <section className="flex flex-col gap-2">
        <label htmlFor="qr-input" className="text-sm font-medium text-foreground">
          Text or URL
        </label>
        <Input
          id="qr-input"
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="https://example.com"
          className="font-mono text-sm"
        />
      </section>

      {displayError ? (
        <div
          role="alert"
          className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive"
        >
          {displayError}
        </div>
      ) : null}

      {displayDataUrl ? (
        <section className="flex flex-col items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={displayDataUrl} alt="Generated QR code" className="rounded-md border border-border" />
          <div className="flex gap-2">
            <Button onClick={handleDownload}>Download PNG</Button>
            <CopyButton value={displayDataUrl} label="Copy data URL" />
          </div>
        </section>
      ) : (
        <p className="text-sm text-muted-foreground">
          Enter text to generate a QR code.
        </p>
      )}
    </div>
  );
}

export default QrCodeGenerator;