const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-";

export function generateNanoId(size = 21): string {
  const safeSize = Math.max(1, Math.min(256, Math.floor(size)));
  const bytes = new Uint8Array(safeSize);
  if (typeof crypto !== "undefined" && typeof crypto.getRandomValues === "function") {
    crypto.getRandomValues(bytes);
  } else {
    for (let i = 0; i < bytes.length; i++) {
      bytes[i] = Math.floor(Math.random() * 256);
    }
  }
  let id = "";
  for (let i = 0; i < safeSize; i++) {
    id += ALPHABET[bytes[i] % ALPHABET.length];
  }
  return id;
}

export function generateNanoIds(count: number, size = 21): string[] {
  const safe = Math.max(1, Math.min(100, Math.floor(count)));
  const result: string[] = [];
  for (let i = 0; i < safe; i++) {
    result.push(generateNanoId(size));
  }
  return result;
}