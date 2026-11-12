import { describe, expect, it } from "vitest";
import { formatCss, minifyCss } from "./css";

describe("formatCss", () => {
  it("formats", () => {
    const result = formatCss("body{color:red;margin:0;}");
    expect(result).toContain("body {");
    expect(result).toContain("color:red;");
  });

  it("throws on empty", () => {
    expect(() => formatCss("   ")).toThrow();
  });
});

describe("minifyCss", () => {
  it("minifies", () => {
    const result = minifyCss("body {\n  color: red;\n  margin: 0;\n}");
    expect(result).toBe("body{color:red;margin:0;}");
  });
});