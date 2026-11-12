"use client";

import { useMemo, useState } from "react";
import { runRegex, AVAILABLE_FLAGS } from "../lib/regex";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

export function RegexTester() {
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState("g");
  const [text, setText] = useState("");

  const result = useMemo(() => runRegex(pattern, flags, text), [pattern, flags, text]);

  const toggleFlag = (flag: string) => {
    setFlags((prev) =>
      prev.includes(flag) ? prev.replace(flag, "") : prev + flag,
    );
  };

  // Build highlighted preview.
  const highlighted = useMemo(() => {
    if (!pattern || result.error || result.matches.length === 0) return null;
    const parts: { text: string; match: boolean }[] = [];
    let cursor = 0;
    for (const m of result.matches) {
      if (m.index > cursor) {
        parts.push({ text: text.slice(cursor, m.index), match: false });
      }
      parts.push({ text: m.match, match: true });
      cursor = m.index + m.match.length;
    }
    if (cursor < text.length) {
      parts.push({ text: text.slice(cursor), match: false });
    }
    return parts;
  }, [pattern, result, text]);

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 p-6">
      <section className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Regex Tester
        </h1>
        <p className="text-sm text-muted-foreground">
          Test regular expressions against text locally.
        </p>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="regex-pattern" className="text-sm font-medium text-foreground">
            Pattern
          </label>
          <Input
            id="regex-pattern"
            value={pattern}
            onChange={(event) => setPattern(event.target.value)}
            placeholder="\\d+"
            className="font-mono text-sm"
            spellCheck={false}
          />
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-foreground">Flags</span>
          <div className="flex flex-wrap gap-2">
            {AVAILABLE_FLAGS.map((flag) => (
              <label
                key={flag}
                className="flex items-center gap-1.5 rounded-md border border-border bg-card px-2 py-1 text-sm"
              >
                <input
                  type="checkbox"
                  checked={flags.includes(flag)}
                  onChange={() => toggleFlag(flag)}
                  className="size-3.5"
                />
                {flag}
              </label>
            ))}
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-2">
        <label htmlFor="regex-text" className="text-sm font-medium text-foreground">
          Test string
        </label>
        <Textarea
          id="regex-text"
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="Enter text to test..."
          className="min-h-[180px] font-mono text-sm"
          spellCheck={false}
        />
      </section>

      {result.error ? (
        <div
          role="alert"
          className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive"
        >
          {result.error}
        </div>
      ) : null}

      <section className="flex flex-col gap-2">
        <h2 className="text-sm font-medium text-foreground">
          Matches ({result.matches.length})
        </h2>
        {result.matches.length === 0 ? (
          <p className="text-sm text-muted-foreground">No matches.</p>
        ) : (
          <ul className="flex flex-col gap-1">
            {result.matches.map((m, i) => (
              <li
                key={`${m.index}-${i}`}
                className="rounded-md border border-border bg-card px-3 py-2 font-mono text-sm"
              >
                <span className="text-muted-foreground">[{m.index}]</span>{" "}
                <span className="text-foreground">{JSON.stringify(m.match)}</span>
                {m.groups.length > 0 ? (
                  <span className="ml-2 text-xs text-muted-foreground">
                    groups: {m.groups.map((g) => JSON.stringify(g)).join(", ")}
                  </span>
                ) : null}
              </li>
            ))}
          </ul>
        )}
      </section>

      {highlighted ? (
        <section className="flex flex-col gap-2">
          <h2 className="text-sm font-medium text-foreground">Preview</h2>
          <pre className="whitespace-pre-wrap rounded-md border border-border bg-card p-3 font-mono text-sm text-foreground">
            {highlighted.map((part, i) =>
              part.match ? (
                <mark key={i} className="rounded bg-primary/30 px-0.5">
                  {part.text}
                </mark>
              ) : (
                <span key={i}>{part.text}</span>
              ),
            )}
          </pre>
        </section>
      ) : null}
    </div>
  );
}

export default RegexTester;