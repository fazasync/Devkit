export interface PasswordOptions {
  length: number;
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
}

const UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
const NUMBERS = "0123456789";
const SYMBOLS = "!@#$%^&*()-_=+[]{};:,.<>?";

export function generatePassword(options: PasswordOptions): string {
  const { length, uppercase, lowercase, numbers, symbols } = options;
  let charset = "";
  if (uppercase) charset += UPPERCASE;
  if (lowercase) charset += LOWERCASE;
  if (numbers) charset += NUMBERS;
  if (symbols) charset += SYMBOLS;

  if (charset.length === 0) {
    throw new Error("Select at least one character set.");
  }

  const safeLength = Math.max(4, Math.min(128, Math.floor(length)));
  const bytes = new Uint32Array(safeLength);
  if (typeof crypto !== "undefined" && typeof crypto.getRandomValues === "function") {
    crypto.getRandomValues(bytes);
  } else {
    for (let i = 0; i < bytes.length; i++) {
      bytes[i] = Math.floor(Math.random() * 0xffffffff);
    }
  }

  let password = "";
  for (let i = 0; i < safeLength; i++) {
    password += charset[bytes[i] % charset.length];
  }
  return password;
}