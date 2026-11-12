export function encodeUrlComponent(input: string): string {
  return encodeURIComponent(input);
}

export function decodeUrlComponent(input: string): string {
  const trimmed = input.trim();
  if (trimmed.length === 0) {
    throw new Error("Input is empty.");
  }
  try {
    return decodeURIComponent(trimmed);
  } catch {
    throw new Error("Invalid URL-encoded input.");
  }
}