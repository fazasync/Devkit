const ENCODING = "0123456789ABCDEFGHJKMNPQRSTVWXYZ"; // Crockford base32

function encodeTime(time: number, length: number): string {
  let str = "";
  for (let i = length - 1; i >= 0; i--) {
    const mod = time % 32;
    str = ENCODING[mod] + str;
    time = Math.floor(time / 32);
  }
  return str;
}

function encodeRandom(length: number): string {
  const bytes = new Uint8Array(length);
  if (typeof crypto !== "undefined" && typeof crypto.getRandomValues === "function") {
    crypto.getRandomValues(bytes);
  } else {
    for (let i = 0; i < bytes.length; i++) {
      bytes[i] = Math.floor(Math.random() * 256);
    }
  }
  let str = "";
  for (let i = 0; i < length; i++) {
    str += ENCODING[bytes[i] % 32];
  }
  return str;
}

export function generateUlid(time: number = Date.now()): string {
  return encodeTime(time, 10) + encodeRandom(16);
}

export function generateUlids(count: number): string[] {
  const safe = Math.max(1, Math.min(100, Math.floor(count)));
  const result: string[] = [];
  for (let i = 0; i < safe; i++) {
    result.push(generateUlid());
  }
  return result;
}