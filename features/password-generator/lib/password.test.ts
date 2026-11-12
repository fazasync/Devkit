import { describe, expect, it } from "vitest";
import { generatePassword } from "./password";

describe("generatePassword", () => {
  it("generates requested length", () => {
    const pw = generatePassword({
      length: 16,
      uppercase: true,
      lowercase: true,
      numbers: true,
      symbols: false,
    });
    expect(pw).toHaveLength(16);
  });

  it("clamps length", () => {
    const pw = generatePassword({
      length: 2,
      uppercase: true,
      lowercase: false,
      numbers: false,
      symbols: false,
    });
    expect(pw.length).toBeGreaterThanOrEqual(4);
  });

  it("throws when no charset", () => {
    expect(() =>
      generatePassword({
        length: 10,
        uppercase: false,
        lowercase: false,
        numbers: false,
        symbols: false,
      }),
    ).toThrow();
  });

  it("respects charset restriction", () => {
    const pw = generatePassword({
      length: 20,
      uppercase: false,
      lowercase: true,
      numbers: false,
      symbols: false,
    });
    expect(/^[a-z]+$/.test(pw)).toBe(true);
  });
});