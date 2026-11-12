import { describe, expect, it } from "vitest";
import { formatXml, minifyXml } from "./xml";

describe("formatXml", () => {
  it("formats simple xml", () => {
    const result = formatXml("<root><a>1</a><b>2</b></root>");
    expect(result).toContain("<root>");
    expect(result).toContain("<a>");
  });

  it("throws on invalid", () => {
    expect(() => formatXml("<root><a></root>")).toThrow();
  });

  it("throws on empty", () => {
    expect(() => formatXml("   ")).toThrow();
  });
});

describe("minifyXml", () => {
  it("minifies", () => {
    const result = minifyXml("<root>\n  <a>1</a>\n</root>");
    expect(result).toBe("<root><a>1</a></root>");
  });
});