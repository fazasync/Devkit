export function formatXml(input: string): string {
  const trimmed = input.trim();
  if (trimmed.length === 0) {
    throw new Error("Input is empty.");
  }

  if (!isWellFormed(trimmed)) {
    throw new Error("Invalid XML.");
  }

  const xml = trimmed.replace(/>\s+</g, "><");

  let formatted = "";
  let indent = 0;
  const tokens = xml.split(/(<[^>]+>)/g).filter(Boolean);

  for (const token of tokens) {
    if (token.startsWith("</")) {
      indent = Math.max(0, indent - 1);
      formatted += "  ".repeat(indent) + token + "\n";
    } else if (token.startsWith("<")) {
      formatted += "  ".repeat(indent) + token + "\n";
      if (!token.endsWith("/>") && !token.startsWith("<?") && !token.startsWith("<!")) {
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

export function minifyXml(input: string): string {
  const trimmed = input.trim();
  if (trimmed.length === 0) {
    throw new Error("Input is empty.");
  }
  if (!isWellFormed(trimmed)) {
    throw new Error("Invalid XML.");
  }
  return trimmed.replace(/>\s+</g, "><");
}

function isWellFormed(input: string): boolean {
  if (!/<[a-zA-Z]/.test(input)) return false;
  const stack: string[] = [];
  const tagRegex = /<\/?([a-zA-Z_][\w:.-]*)[^>]*>/g;
  let match: RegExpExecArray | null;
  while ((match = tagRegex.exec(input)) !== null) {
    const full = match[0];
    const name = match[1];
    if (full.startsWith("</")) {
      if (stack.length === 0 || stack.pop() !== name) return false;
    } else if (
      !full.endsWith("/>") &&
      !full.startsWith("<?") &&
      !full.startsWith("<!")
    ) {
      stack.push(name);
    }
  }
  return stack.length === 0;
}