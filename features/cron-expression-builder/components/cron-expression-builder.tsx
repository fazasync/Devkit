"use client";

import { useState } from "react";
import { parseCron } from "../lib/cron";
import { Input } from "@/components/ui/input";

export function CronExpressionBuilder() {
  const [input, setInput] = useState("*/5 * * * *");
  const explanation = parseCron(input);

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 p-6">
      <section className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Cron Expression Builder
        </h1>
        <p className="text-sm text-muted-foreground">
          Parse and explain cron expressions locally.
        </p>
      </section>

      <section className="flex flex-col gap-2">
        <label htmlFor="cron-input" className="text-sm font-medium text-foreground">
          Cron expression (5 fields)
        </label>
        <Input
          id="cron-input"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="*/5 * * * *"
          className="font-mono text-sm"
        />
      </section>

      {explanation ? (
        <section className="flex flex-col gap-2">
          {Object.entries(explanation).map(([key, value]) => (
            <div
              key={key}
              className="flex items-center gap-3 rounded-md border border-border bg-card px-3 py-2"
            >
              <span className="w-28 text-xs font-medium text-muted-foreground">
                {key}
              </span>
              <span className="text-sm text-foreground">{value}</span>
            </div>
          ))}
        </section>
      ) : (
        <p className="text-sm text-destructive">
          Invalid cron expression. Expected 5 fields.
        </p>
      )}
    </div>
  );
}

export default CronExpressionBuilder;