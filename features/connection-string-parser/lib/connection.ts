export interface ConnectionParam {
  key: string;
  value: string;
}

export function parseConnectionString(input: string): ConnectionParam[] {
  const trimmed = input.trim();
  if (trimmed.length === 0) {
    throw new Error("Input is empty.");
  }

  // Try URL form first.
  try {
    const url = new URL(trimmed);
    const params: ConnectionParam[] = [
      { key: "protocol", value: url.protocol },
      { key: "host", value: url.hostname },
    ];
    if (url.port) params.push({ key: "port", value: url.port });
    if (url.pathname && url.pathname !== "/") {
      params.push({ key: "database", value: url.pathname.replace(/^\//, "") });
    }
    if (url.username) params.push({ key: "username", value: url.username });
    if (url.password) params.push({ key: "password", value: url.password });
    url.searchParams.forEach((value, key) => {
      params.push({ key, value });
    });
    return params;
  } catch {
    // Fall through to key=value parsing.
  }

  // key=value;key2=value2 form
  const params: ConnectionParam[] = [];
  const segments = trimmed.split(/[;]/);
  for (const segment of segments) {
    const idx = segment.indexOf("=");
    if (idx === -1) {
      const key = segment.trim();
      if (key.length > 0) params.push({ key, value: "" });
      continue;
    }
    const key = segment.slice(0, idx).trim();
    const value = segment.slice(idx + 1).trim();
    if (key.length > 0) params.push({ key, value });
  }
  if (params.length === 0) {
    throw new Error("No parameters found.");
  }
  return params;
}