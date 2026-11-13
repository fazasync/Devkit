export type HmacAlgorithm = "SHA-1" | "SHA-256" | "SHA-384" | "SHA-512";

export async function computeHmac(
  message: string,
  secret: string,
  algorithm: HmacAlgorithm,
): Promise<string> {
  if (typeof crypto === "undefined" || !crypto.subtle) {
    throw new Error("Web Crypto is not available.");
  }
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: algorithm },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(message),
  );
  const bytes = new Uint8Array(signature);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
}