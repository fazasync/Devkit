export function encodeBase64(input: string): string {
  const bytes = new TextEncoder().encode(input);
  let binary = "";
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }
  return btoa(binary);
}

export function decodeBase64(input: string): string {
  const trimmed = input.trim();
  if (trimmed.length === 0) {
    throw new Error("Input is empty.");
  }
  let binary: string;
  try {
    binary = atob(trimmed);
  } catch {
    throw new Error("Invalid Base64 input.");
  }
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return new TextDecoder().decode(bytes);
}

export function isValidBase64(input: string): boolean {
  const trimmed = input.trim();
  if (trimmed.length === 0) return false;
  try {
    atob(trimmed);
    return true;
  } catch {
    return false;
  }
}