export function formatCss(input: string): string {
  const trimmed = input.trim();
  if (trimmed.length === 0) {
    throw new Error("Input is empty.");
  }

  let css = trimmed.replace(/\s+/g, " ");
  // Put each declaration on its own line.
  css = css.replace(/\{/g, " {\n  ").replace(/\}/g, "\n}\n").replace(/;/g, ";\n  ");
  // Clean up.
  const lines = css.split("\n").map((line) => line.trimEnd());
  // Remove empty lines and fix indentation heuristically.
  const result: string[] = [];
  let indent = 0;
  for (const raw of lines) {
    const line = raw.trim();
    if (line.length === 0) continue;
    if (line.startsWith("}")) {
      indent = Math.max(0, indent - 1);
    }
    result.push("  ".repeat(indent) + line);
    if (line.endsWith("{")) {
      indent++;
    }
  }
  return result.join("\n").trim();
}

export function minifyCss(input: string): string {
  const trimmed = input.trim();
  if (trimmed.length === 0) {
    throw new Error("Input is empty.");
  }
  return trimmed
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\s+/g, " ")
    .replace(/\s*([{}:;,])\s*/g, "$1")
    .trim();
}