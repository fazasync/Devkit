export interface ParsedCurl {
  method: string;
  url: string;
  headers: Record<string, string>;
  body: string | null;
}

export function parseCurl(command: string): ParsedCurl {
  const trimmed = command.trim();
  if (trimmed.length === 0) {
    throw new Error("Input is empty.");
  }

  // Remove leading "curl" and normalize line continuations.
  let input = trimmed.replace(/\\\n/g, " ");
  if (/^curl\b/i.test(input)) {
    input = input.replace(/^curl\b/i, "").trim();
  }

  const headers: Record<string, string> = {};
  let method = "GET";
  let url = "";
  let body: string | null = null;

  // Tokenize respecting quotes.
  const tokens: string[] = [];
  let current = "";
  let quote: string | null = null;
  for (let i = 0; i < input.length; i++) {
    const ch = input[i];
    if (quote) {
      if (ch === quote) {
        quote = null;
      } else {
        current += ch;
      }
    } else if (ch === '"' || ch === "'") {
      quote = ch;
    } else if (/\s/.test(ch)) {
      if (current.length > 0) {
        tokens.push(current);
        current = "";
      }
    } else {
      current += ch;
    }
  }
  if (current.length > 0) tokens.push(current);

  let i = 0;
  while (i < tokens.length) {
    const token = tokens[i];
    if (token === "-X" || token === "--request") {
      method = (tokens[++i] || "GET").toUpperCase();
    } else if (token === "-H" || token === "--header") {
      const header = tokens[++i] || "";
      const idx = header.indexOf(":");
      if (idx !== -1) {
        headers[header.slice(0, idx).trim()] = header.slice(idx + 1).trim();
      }
    } else if (
      token === "-d" ||
      token === "--data" ||
      token === "--data-raw" ||
      token === "--data-binary"
    ) {
      body = tokens[++i] || null;
      if (method === "GET") method = "POST";
    } else if (token.startsWith("http")) {
      url = token;
    } else if (!token.startsWith("-")) {
      // Could be URL without scheme.
      if (!url) url = token;
    }
    i++;
  }

  if (!url) {
    throw new Error("No URL found in curl command.");
  }

  return { method, url, headers, body };
}

export function toFetchCode(parsed: ParsedCurl): string {
  const lines: string[] = [];
  lines.push(`fetch(${JSON.stringify(parsed.url)}, {`);
  lines.push(`  method: ${JSON.stringify(parsed.method)},`);
  if (Object.keys(parsed.headers).length > 0) {
    lines.push(`  headers: ${JSON.stringify(parsed.headers, null, 2).replace(/\n/g, "\n  ")},`);
  }
  if (parsed.body) {
    lines.push(`  body: ${JSON.stringify(parsed.body)},`);
  }
  lines.push("})");
  return lines.join("\n");
}