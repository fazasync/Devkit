import { describe, expect, it } from "vitest";
import { formatJavaScript, minifyJavaScript } from "./javascript";

describe("formatJavaScript", () => {
  it("formats", () => {
    const result = formatJavaScript("function a(){return 1;}");
    expect(result).toContain("function a() {");
  });

  it("throws on empty", () => {
    expect(() => formatJavaScript("   ")).toThrow();
  });
});

describe("minifyJavaScript", () => {
  it("minifies", () => {
    const result = minifyJavaScript("function a() {\n  return 1;\n}");
    expect(result).toBe("function a(){return 1;}");
  });
});