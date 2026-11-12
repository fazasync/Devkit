"use client";

import { useMemo, useState } from "react";
import { searchStatuses } from "../lib/http-status";
import { Input } from "@/components/ui/input";

export function HttpStatusReference() {
  const [query, setQuery] = useState("");
  const results = useMemo(() => searchStatuses(query), [query]);

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 p-6">
      <section className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          HTTP Status Reference
        </h1>
        <p className="text-sm text-muted-foreground">
          Reference for HTTP status codes.
        </p>
      </section>

      <section>
        <Input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search by code, name, or description..."
          className="max-w-md"
        />
      </section>

      <section className="flex flex-col gap-2">
        {results.map((s) => (
          <div
            key={s.code}
            className="flex flex-col gap-1 rounded-md border border-border bg-card px-3 py-2"
          >
            <div className="flex items-center gap-3">
              <span className="font-mono text-sm font-semibold text-foreground">
                {s.code}
              </span>
              <span className="text-sm font-medium text-foreground">{s.name}</span>
              <span className="ml-auto text-xs text-muted-foreground">
                {s.category}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">{s.description}</p>
          </div>
        ))}
        {results.length === 0 ? (
          <p className="text-sm text-muted-foreground">No matches.</p>
        ) : null}
      </section>
    </div>
  );
}

export default HttpStatusReference;