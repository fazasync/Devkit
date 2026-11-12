export interface DecodedJwt {
  header: unknown;
  payload: unknown;
  signature: string;
}

export class JwtDecodeError extends Error {}

function base64UrlDecode(value: string): string {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/");
  const padLength = (4 - (padded.length % 4)) % 4;
  const base64 = padded + "=".repeat(padLength);
  try {
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return new TextDecoder().decode(bytes);
  } catch {
    throw new JwtDecodeError("Invalid Base64URL segment.");
  }
}

export function decodeJwt(token: string): DecodedJwt {
  const trimmed = token.trim();
  if (trimmed.length === 0) {
    throw new JwtDecodeError("Input is empty.");
  }

  const parts = trimmed.split(".");
  if (parts.length !== 3) {
    throw new JwtDecodeError("JWT must have 3 parts separated by dots.");
  }

  const [headerSegment, payloadSegment, signatureSegment] = parts;

  let header: unknown;
  let payload: unknown;
  try {
    header = JSON.parse(base64UrlDecode(headerSegment));
  } catch {
    throw new JwtDecodeError("Invalid JWT header.");
  }
  try {
    payload = JSON.parse(base64UrlDecode(payloadSegment));
  } catch {
    throw new JwtDecodeError("Invalid JWT payload.");
  }

  return { header, payload, signature: signatureSegment };
}

export function formatClaimDate(value: unknown): string | null {
  if (typeof value !== "number" || !Number.isFinite(value)) return null;
  const date = new Date(value * 1000);
  if (Number.isNaN(date.getTime())) return null;
  return date.toISOString();
}