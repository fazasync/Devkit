"use client";

import { useState } from "react";
import { renderMarkdown } from "../lib/markdown";
import { Textarea } from "@/components/ui/textarea";

export function MarkdownPreview() {
  const [input, setInput] = useState("# Hello\n\nThis is **bold** and *italic*.\n\n- Item 1\n- Item 2\n\n```js\nconsole.log('hi');\n```");

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 p-6">
      <section className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Markdown Preview
        </h1>
        <p className="text-sm text-muted-foreground">
          Preview Markdown locally.
        </p>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="md-input" className="text-sm font-medium text-foreground">
            Markdown
          </label>
          <Textarea
            id="md-input"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            className="min-h-[360px] font-mono text-sm"
            spellCheck={false}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-foreground">Preview</label>
          <div className="min-h-[360px] rounded-md border border-border bg-card p-4">
            {renderMarkdown(input)}
          </div>
        </div>
      </section>
    </div>
  );
}

export default MarkdownPreview;