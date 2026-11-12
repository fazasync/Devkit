export type HashAlgorithm = "SHA-1" | "SHA-256" | "SHA-384" | "SHA-512";

export const HASH_ALGORITHMS: HashAlgorithm[] = [
  "SHA-1",
  "SHA-256",
  "SHA-384",
  "SHA-512",
];

export async function computeHash(
  input: string,
  algorithm: HashAlgorithm,
): Promise<string> {
  if (typeof crypto === "undefined" || !crypto.subtle) {
    throw new Error("Web Crypto is not available.");
  }
  const data = new TextEncoder().encode(input);
  const buffer = await crypto.subtle.digest(algorithm, data);
  const bytes = new Uint8Array(buffer);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
}