import { describe, expect, it } from "vitest";
import { decodeUrlComponent, encodeUrlComponent } from "./url";

describe("encodeUrlComponent", () => {
  it("encodes spaces", () => {
    expect(encodeUrlComponent("a b")).toBe("a%20b");
  });
  it("encodes special chars", () => {
    expect(encodeUrlComponent("q=1&r=2")).toBe("q%3D1%26r%3D2");
  });
});

describe("decodeUrlComponent", () => {
  it("decodes", () => {
    expect(decodeUrlComponent("a%20b")).toBe("a b");
  });
  it("throws on invalid", () => {
    expect(() => decodeUrlComponent("%E0%A4%A")).toThrow();
  });
  it("throws on empty", () => {
    expect(() => decodeUrlComponent("   ")).toThrow();
  });
});