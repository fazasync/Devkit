export interface ParsedUserAgent {
  browser: string;
  os: string;
  device: string;
  raw: string;
}

export function parseUserAgent(ua: string): ParsedUserAgent {
  const trimmed = ua.trim();
  if (trimmed.length === 0) {
    throw new Error("Input is empty.");
  }

  let browser = "Unknown";
  if (/Edg\//.test(trimmed)) browser = "Edge";
  else if (/OPR\//.test(trimmed)) browser = "Opera";
  else if (/Chrome\//.test(trimmed)) browser = "Chrome";
  else if (/Firefox\//.test(trimmed)) browser = "Firefox";
  else if (/Safari\//.test(trimmed) && !/Chrome/.test(trimmed)) browser = "Safari";

  let os = "Unknown";
  if (/Windows NT/.test(trimmed)) os = "Windows";
  else if (/Mac OS X/.test(trimmed)) os = "macOS";
  else if (/Android/.test(trimmed)) os = "Android";
  else if (/iPhone|iPad|iPod/.test(trimmed)) os = "iOS";
  else if (/Linux/.test(trimmed)) os = "Linux";

  let device = "Desktop";
  if (/Mobi|Android|iPhone|iPod/.test(trimmed)) device = "Mobile";
  else if (/iPad|Tablet/.test(trimmed)) device = "Tablet";

  return { browser, os, device, raw: trimmed };
}