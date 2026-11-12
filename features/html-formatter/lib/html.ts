export function formatHtml(input: string): string {
  const trimmed = input.trim();
  if (trimmed.length === 0) {
    throw new Error("Input is empty.");
  }

  // Normalize whitespace between tags.
  const html = trimmed.replace(/>\s+</g, "><");

  let formatted = "";
  let indent = 0;
  const tokens = html.split(/(<[^>]+>)/g).filter(Boolean);

  for (const token of tokens) {
    if (token.startsWith("</")) {
      indent = Math.max(0, indent - 1);
      formatted += "  ".repeat(indent) + token + "\n";
    } else if (token.startsWith("<")) {
      formatted += "  ".repeat(indent) + token + "\n";
      if (!token.endsWith("/>") && !isVoidTag(token)) {
        indent++;
      }
    } else {
      const text = token.trim();
      if (text.length > 0) {
        formatted += "  ".repeat(indent) + text + "\n";
      }
    }
  }

  return formatted.trimEnd();
}

export function minifyHtml(input: string): string {
  const trimmed = input.trim();
  if (trimmed.length === 0) {
    throw new Error("Input is empty.");
  }
  return trimmed.replace(/>\s+</g, "><").replace(/\s{2,}/g, " ");
}

const VOID_TAGS = new Set([
  "area",
  "base",
  "br",
  "col",
  "embed",
  "hr",
  "img",
  "input",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr",
]);

function isVoidTag(token: string): boolean {
  const match = token.match(/^<([a-zA-Z0-9]+)/);
  if (!match) return false;
  return VOID_TAGS.has(match[1].toLowerCase());
}