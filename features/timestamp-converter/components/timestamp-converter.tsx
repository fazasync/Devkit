"use client";

import { useState } from "react";
import { Clock } from "lucide-react";
import {
  dateToTimestamp,
  formatIso,
  timestampToDate,
  type TimestampUnit,
} from "../lib/timestamp";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// no label component; use native label
import { CopyButton } from "@/components/shared/copy-button";

export function TimestampConverter() {
  const [unit, setUnit] = useState<TimestampUnit>("seconds");
  const [timestampInput, setTimestampInput] = useState("");
  const [dateOutput, setDateOutput] = useState("");
  const [timestampError, setTimestampError] = useState<string | null>(null);

  const [dateInput, setDateInput] = useState("");
  const [timestampOutput, setTimestampOutput] = useState("");
  const [dateError, setDateError] = useState<string | null>(null);

  const handleTimestampConvert = () => {
    try {
      const date = timestampToDate(timestampInput, unit);
      setDateOutput(formatIso(date));
      setTimestampError(null);
    } catch (err) {
      setTimestampError(err instanceof Error ? err.message : "Conversion failed.");
      setDateOutput("");
    }
  };

  const handleDateConvert = () => {
    try {
      const value = dateToTimestamp(dateInput, unit);
      setTimestampOutput(String(value));
      setDateError(null);
    } catch (err) {
      setDateError(err instanceof Error ? err.message : "Conversion failed.");
      setTimestampOutput("");
    }
  };

  const handleNow = () => {
    const now = Date.now();
    const value = unit === "seconds" ? Math.floor(now / 1000) : now;
    setTimestampInput(String(value));
    setDateOutput(new Date(now).toISOString());
    setTimestampError(null);
  };

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 p-6">
      <section className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Unix Timestamp Converter
        </h1>
        <p className="text-sm text-muted-foreground">
          Convert between Unix timestamps and dates locally.
        </p>
      </section>

      <section className="flex items-center gap-3">
        <label htmlFor="unit" className="text-sm font-medium text-foreground">
          Unit
        </label>
        <select
          id="unit"
          value={unit}
          onChange={(event) => setUnit(event.target.value as TimestampUnit)}
          className="h-9 rounded-md border border-border bg-background px-2 text-sm"
        >
          <option value="seconds">Seconds</option>
          <option value="milliseconds">Milliseconds</option>
        </select>
        <Button variant="outline" size="sm" onClick={handleNow}>
          <Clock className="size-4" />
          Now
        </Button>
      </section>

      <section className="flex flex-col gap-3 rounded-lg border border-border bg-card p-4">
        <h2 className="text-sm font-medium text-foreground">Timestamp to Date</h2>
        <div className="flex flex-col gap-2">
          <label htmlFor="ts-input" className="text-sm font-medium text-foreground">
            Unix timestamp
          </label>
          <Input
            id="ts-input"
            value={timestampInput}
            onChange={(event) => setTimestampInput(event.target.value)}
            placeholder={unit === "seconds" ? "1700000000" : "1700000000000"}
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button onClick={handleTimestampConvert}>Convert</Button>
          <CopyButton value={dateOutput} label="Copy date" />
        </div>
        {timestampError ? (
          <p className="text-sm text-destructive">{timestampError}</p>
        ) : null}
        {dateOutput ? (
          <p className="font-mono text-sm text-foreground">{dateOutput}</p>
        ) : null}
      </section>

      <section className="flex flex-col gap-3 rounded-lg border border-border bg-card p-4">
        <h2 className="text-sm font-medium text-foreground">Date to Timestamp</h2>
        <div className="flex flex-col gap-2">
          <label htmlFor="date-input" className="text-sm font-medium text-foreground">
            Date (ISO 8601)
          </label>
          <Input
            id="date-input"
            value={dateInput}
            onChange={(event) => setDateInput(event.target.value)}
            placeholder="2023-11-14T22:13:20.000Z"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button onClick={handleDateConvert}>Convert</Button>
          <CopyButton value={timestampOutput} label="Copy timestamp" />
        </div>
        {dateError ? (
          <p className="text-sm text-destructive">{dateError}</p>
        ) : null}
        {timestampOutput ? (
          <p className="font-mono text-sm text-foreground">{timestampOutput}</p>
        ) : null}
      </section>
    </div>
  );
}

export default TimestampConverter;