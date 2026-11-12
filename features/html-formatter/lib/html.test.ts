import { describe, expect, it } from "vitest";
import { formatHtml, minifyHtml } from "./html";

describe("formatHtml", () => {
  it("formats", () => {
    const result = formatHtml("<div><p>hi</p></div>");
    expect(result).toContain("<div>");
    expect(result).toContain("<p>");
  });

  it("handles void tags", () => {
    const result = formatHtml("<div><br><p>hi</p></div>");
    expect(result).toContain("<br>");
  });

  it("throws on empty", () => {
    expect(() => formatHtml("   ")).toThrow();
  });
});

describe("minifyHtml", () => {
  it("minifies", () => {
    expect(minifyHtml("<div>  <p>hi</p>  </div>")).toBe("<div><p>hi</p></div>");
  });
});