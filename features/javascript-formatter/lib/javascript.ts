export function formatJavaScript(input: string): string {
  const trimmed = input.trim();
  if (trimmed.length === 0) {
    throw new Error("Input is empty.");
  }

  let js = trimmed.replace(/\s+/g, " ");
  js = js.replace(/\{/g, " {\n").replace(/\}/g, "\n}\n").replace(/;/g, ";\n");
  const lines = js.split("\n").map((line) => line.trimEnd());
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

export function minifyJavaScript(input: string): string {
  const trimmed = input.trim();
  if (trimmed.length === 0) {
    throw new Error("Input is empty.");
  }
  return trimmed.replace(/\s+/g, " ").replace(/\s*([{}:;,()])\s*/g, "$1");
}