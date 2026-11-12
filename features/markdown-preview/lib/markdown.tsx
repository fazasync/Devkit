import React from "react";

export function renderMarkdown(markdown: string): React.ReactNode {
  const lines = markdown.split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;
  let codeBlock = false;
  const codeLines: string[] = [];

  while (i < lines.length) {
    const line = lines[i];

    if (line.trim().startsWith("```")) {
      if (codeBlock) {
        elements.push(
          <pre
            key={`code-${i}`}
            className="overflow-auto rounded-md border border-border bg-muted p-3 font-mono text-sm"
          >
            {codeLines.join("\n")}
          </pre>,
        );
        codeLines.length = 0;
        codeBlock = false;
      } else {
        codeBlock = true;
      }
      i++;
      continue;
    }

    if (codeBlock) {
      codeLines.push(line);
      i++;
      continue;
    }

    const headingMatch = line.match(/^(#{1,6})\s+(.*)$/);
    if (headingMatch) {
      const level = headingMatch[1].length;
      const text = headingMatch[2];
      const className =
        level === 1
          ? "text-2xl font-bold"
          : level === 2
            ? "text-xl font-semibold"
            : level === 3
              ? "text-lg font-semibold"
              : "text-base font-medium";
      elements.push(
        <div key={`h-${i}`} className={`${className} mt-4 mb-2 text-foreground`}>
          {text}
        </div>,
      );
      i++;
      continue;
    }

    if (/^\s*[-*]\s+/.test(line)) {
      elements.push(
        <li key={`li-${i}`} className="ml-4 list-disc text-foreground">
          {line.replace(/^\s*[-*]\s+/, "")}
        </li>,
      );
      i++;
      continue;
    }

    if (line.trim() === "") {
      elements.push(<div key={`br-${i}`} className="h-2" />);
      i++;
      continue;
    }

    // Paragraph with inline formatting (bold/italic/code)
    elements.push(
      <p key={`p-${i}`} className="text-foreground">
        {renderInlineText(line)}
      </p>,
    );
    i++;
  }

  if (codeBlock && codeLines.length > 0) {
    elements.push(
      <pre
        key="code-end"
        className="overflow-auto rounded-md border border-border bg-muted p-3 font-mono text-sm"
      >
        {codeLines.join("\n")}
      </pre>,
    );
  }

  return <div className="flex flex-col gap-1">{elements}</div>;
}

function renderInlineText(text: string): React.ReactNode[] {
  // Split by bold, italic, code markers.
  const regex = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g;
  const parts = text.split(regex);
  return parts.map((part, idx) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={idx} className="font-semibold">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("*") && part.endsWith("*") && part.length > 2) {
      return (
        <em key={idx} className="italic">
          {part.slice(1, -1)}
        </em>
      );
    }
    if (part.startsWith("`") && part.endsWith("`") && part.length > 2) {
      return (
        <code key={idx} className="rounded bg-muted px-1 py-0.5 font-mono text-sm">
          {part.slice(1, -1)}
        </code>
      );
    }
    return <React.Fragment key={idx}>{part}</React.Fragment>;
  });
}