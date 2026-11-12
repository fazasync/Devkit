"use client";

import { useState } from "react";
import { parseIp } from "../lib/ip";
import { Input } from "@/components/ui/input";

export function IpAddressInfo() {
  const [input, setInput] = useState("");
  const result = input.trim().length === 0 ? null : parseIp(input);

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 p-6">
      <section className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          IP Address Information
        </h1>
        <p className="text-sm text-muted-foreground">
          Inspect IP addresses locally.
        </p>
      </section>

      <section>
        <Input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="192.168.1.1"
          className="font-mono text-sm"
        />
      </section>

      {result ? (
        result.version === "Invalid" ? (
          <p className="text-sm text-destructive">Invalid IP address.</p>
        ) : (
          <section className="flex flex-col gap-2">
            {Object.entries(result).map(([key, value]) => (
              <div
                key={key}
                className="flex items-center gap-3 rounded-md border border-border bg-card px-3 py-2"
              >
                <span className="w-24 text-xs font-medium text-muted-foreground">
                  {key}
                </span>
                <span className="text-sm text-foreground">
                  {String(value)}
                </span>
              </div>
            ))}
          </section>
        )
      ) : null}
    </div>
  );
}

export default IpAddressInfo;