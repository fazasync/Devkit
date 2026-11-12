export interface IpInfo {
  version: "IPv4" | "IPv6" | "Invalid";
  binary?: string;
  class?: string;
  isPrivate?: boolean;
  normalized?: string;
}

const PRIVATE_V4_RANGES = [
  { start: ipToInt("10.0.0.0"), end: ipToInt("10.255.255.255") },
  { start: ipToInt("172.16.0.0"), end: ipToInt("172.31.255.255") },
  { start: ipToInt("192.168.0.0"), end: ipToInt("192.168.255.255") },
  { start: ipToInt("127.0.0.0"), end: ipToInt("127.255.255.255") },
];

function ipToInt(ip: string): number {
  const parts = ip.split(".").map(Number);
  return ((parts[0] << 24) | (parts[1] << 16) | (parts[2] << 8) | parts[3]) >>> 0;
}

export function parseIp(input: string): IpInfo {
  const trimmed = input.trim();
  if (trimmed.length === 0) {
    throw new Error("Input is empty.");
  }

  if (/^\d{1,3}(\.\d{1,3}){3}$/.test(trimmed)) {
    const parts = trimmed.split(".").map(Number);
    if (parts.some((p) => p < 0 || p > 255)) {
      return { version: "Invalid" };
    }
    const int = ipToInt(trimmed);
    const first = parts[0];
    let ipClass = "Unknown";
    if (first >= 1 && first <= 126) ipClass = "A";
    else if (first >= 128 && first <= 191) ipClass = "B";
    else if (first >= 192 && first <= 223) ipClass = "C";
    else if (first >= 224 && first <= 239) ipClass = "D (Multicast)";
    else if (first >= 240) ipClass = "E (Reserved)";

    const isPrivate = PRIVATE_V4_RANGES.some((r) => int >= r.start && int <= r.end);

    const binary = parts.map((p) => p.toString(2).padStart(8, "0")).join(".");

    return {
      version: "IPv4",
      binary,
      class: ipClass,
      isPrivate,
      normalized: trimmed,
    };
  }

  // Basic IPv6 detection.
  if (trimmed.includes(":")) {
    return {
      version: "IPv6",
      normalized: trimmed.toLowerCase(),
    };
  }

  return { version: "Invalid" };
}