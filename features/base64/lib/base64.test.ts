import { describe, expect, it } from "vitest";
import { decodeBase64, encodeBase64, isValidBase64 } from "./base64";

describe("encodeBase64", () => {
  it("encodes ASCII", () => {
    expect(encodeBase64("hello")).toBe("aGVsbG8=");
  });

  it("encodes unicode", () => {
    expect(encodeBase64("✓")).toBe("4pyT");
  });

  it("encodes empty string", () => {
    expect(encodeBase64("")).toBe("");
  });
});

describe("decodeBase64", () => {
  it("decodes ASCII", () => {
    expect(decodeBase64("aGVsbG8=")).toBe("hello");
  });

  it("decodes unicode", () => {
    expect(decodeBase64("4pyT")).toBe("✓");
  });

  it("throws on invalid input", () => {
    expect(() => decodeBase64("!!!")).toThrow();
  });

  it("throws on empty input", () => {
    expect(() => decodeBase64("   ")).toThrow();
  });
});

describe("isValidBase64", () => {
  it("returns true for valid", () => {
    expect(isValidBase64("aGVsbG8=")).toBe(true);
  });

  it("returns false for invalid", () => {
    expect(isValidBase64("!!!")).toBe(false);
  });

  it("returns false for empty", () => {
    expect(isValidBase64("")).toBe(false);
  });
});