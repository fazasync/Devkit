import { describe, expect, it } from "vitest";
import { formatYaml, minifyYaml, validateYaml } from "./yaml";

describe("formatYaml", () => {
  it("formats yaml", () => {
    const result = formatYaml("a: 1\nb:\n  c: 2");
    expect(result).toContain("a: 1");
    expect(result).toContain("c: 2");
  });

  it("throws on invalid", () => {
    expect(() => formatYaml("a: [")).toThrow();
  });

  it("throws on empty", () => {
    expect(() => formatYaml("   ")).toThrow();
  });
});

describe("minifyYaml", () => {
  it("minifies", () => {
    const result = minifyYaml("a: 1\nb: 2");
    expect(result).toContain("a: 1");
  });
});

describe("validateYaml", () => {
  it("valid", () => {
    expect(validateYaml("a: 1")).toBe(true);
  });
  it("invalid", () => {
    expect(validateYaml("a: [")).toBe(false);
  });
  it("empty", () => {
    expect(validateYaml("")).toBe(false);
  });
});