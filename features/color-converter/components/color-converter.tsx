"use client";

import { useMemo, useState } from "react";
import {
  parseColor,
  rgbToHex,
  rgbToHsl,
  hslToRgb,
} from "../lib/color";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CopyButton } from "@/components/shared/copy-button";

export function ColorConverter() {
  const [input, setInput] = useState("#6477e8");

  const rgb = useMemo(() => parseColor(input), [input]);
  const hex = rgb ? rgbToHex(rgb) : "";
  const hsl = rgb ? rgbToHsl(rgb) : null;

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 p-6">
      <section className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Color Converter
        </h1>
        <p className="text-sm text-muted-foreground">
          Convert colors between hex, RGB, and HSL locally.
        </p>
      </section>

      <section className="flex flex-col gap-2">
        <label htmlFor="color-input" className="text-sm font-medium text-foreground">
          Color (hex, rgb(), or hsl())
        </label>
        <div className="flex items-center gap-3">
          <Input
            id="color-input"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="#6477e8"
            className="font-mono text-sm"
          />
          {rgb ? (
            <div
              className="size-10 shrink-0 rounded-md border border-border"
              style={{ backgroundColor: hex }}
              aria-hidden="true"
            />
          ) : null}
        </div>
      </section>

      {rgb ? (
        <section className="flex flex-col gap-3">
          <div className="flex items-center justify-between rounded-md border border-border bg-card px-3 py-2">
            <span className="text-sm text-muted-foreground">HEX</span>
            <div className="flex items-center gap-2">
              <code className="font-mono text-sm text-foreground">{hex}</code>
              <CopyButton value={hex} label="Copy" />
            </div>
          </div>
          <div className="flex items-center justify-between rounded-md border border-border bg-card px-3 py-2">
            <span className="text-sm text-muted-foreground">RGB</span>
            <div className="flex items-center gap-2">
              <code className="font-mono text-sm text-foreground">
                rgb({rgb.r}, {rgb.g}, {rgb.b})
              </code>
              <CopyButton value={`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`} label="Copy" />
            </div>
          </div>
          {hsl ? (
            <div className="flex items-center justify-between rounded-md border border-border bg-card px-3 py-2">
              <span className="text-sm text-muted-foreground">HSL</span>
              <div className="flex items-center gap-2">
                <code className="font-mono text-sm text-foreground">
                  hsl({hsl.h}, {hsl.s}%, {hsl.l}%)
                </code>
                <CopyButton value={`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`} label="Copy" />
              </div>
            </div>
          ) : null}
        </section>
      ) : (
        <p className="text-sm text-destructive">Invalid color.</p>
      )}
    </div>
  );
}

export default ColorConverter;