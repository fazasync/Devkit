"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function ApiRequestBuilder() {
  const [method, setMethod] = useState("GET");
  const [url, setUrl] = useState("");
  const [headers, setHeaders] = useState("");
  const [body, setBody] = useState("");
  const [response, setResponse] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!url.trim()) {
      setError("URL is required.");
      return;
    }
    setLoading(true);
    setError(null);
    setResponse("");
    setStatus(null);

    let parsedHeaders: Record<string, string> = {};
    try {
      if (headers.trim().length > 0) {
        parsedHeaders = JSON.parse(headers);
      }
    } catch {
      setError("Headers must be valid JSON.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(url.trim(), {
        method,
        headers: parsedHeaders,
        body: method !== "GET" && method !== "HEAD" ? body : undefined,
      });
      setStatus(`${res.status} ${res.statusText}`);
      const text = await res.text();
      try {
        setResponse(JSON.stringify(JSON.parse(text), null, 2));
      } catch {
        setResponse(text);
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? `${err.message}. (CORS or network error may block the request.)`
          : "Request failed.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 p-6">
      <section className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          API Request Builder
        </h1>
        <p className="text-sm text-muted-foreground">
          Build and send HTTP requests. (Subject to CORS restrictions.)
        </p>
      </section>

      <div className="flex gap-2">
        <select
          value={method}
          onChange={(event) => setMethod(event.target.value)}
          className="h-10 rounded-md border border-border bg-background px-2 text-sm"
        >
          {["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"].map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
        <Input
          value={url}
          onChange={(event) => setUrl(event.target.value)}
          placeholder="https://api.example.com/endpoint"
          className="flex-1 font-mono text-sm"
        />
        <Button onClick={handleSend} disabled={loading}>
          <Send className="size-4" />
          {loading ? "Sending..." : "Send"}
        </Button>
      </div>

      <section className="flex flex-col gap-2">
        <label htmlFor="api-headers" className="text-sm font-medium text-foreground">
          Headers (JSON)
        </label>
        <Textarea
          id="api-headers"
          value={headers}
          onChange={(event) => setHeaders(event.target.value)}
          placeholder='{"Content-Type": "application/json"}'
          className="min-h-[80px] font-mono text-sm"
          spellCheck={false}
        />
      </section>

      {method !== "GET" && method !== "HEAD" ? (
        <section className="flex flex-col gap-2">
          <label htmlFor="api-body" className="text-sm font-medium text-foreground">
            Body
          </label>
          <Textarea
            id="api-body"
            value={body}
            onChange={(event) => setBody(event.target.value)}
            placeholder="Request body..."
            className="min-h-[120px] font-mono text-sm"
            spellCheck={false}
          />
        </section>
      ) : null}

      {error ? (
        <div
          role="alert"
          className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive"
        >
          {error}
        </div>
      ) : null}

      {status ? (
        <section className="flex flex-col gap-2">
          <div className="text-sm font-medium text-foreground">Status: {status}</div>
          <Textarea
            value={response}
            readOnly
            className="min-h-[240px] font-mono text-sm"
            spellCheck={false}
          />
        </section>
      ) : null}
    </div>
  );
}

export default ApiRequestBuilder;