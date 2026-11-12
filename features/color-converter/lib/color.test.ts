import { describe, expect, it } from "vitest";
import {
  hexToRgb,
  parseColor,
  rgbToHex,
  rgbToHsl,
} from "./color";

describe("hexToRgb", () => {
  it("parses 6-digit", () => {
    expect(hexToRgb("#ff0000")).toEqual({ r: 255, g: 0, b: 0 });
  });
  it("parses 3-digit", () => {
    expect(hexToRgb("#f00")).toEqual({ r: 255, g: 0, b: 0 });
  });
  it("returns null for invalid", () => {
    expect(hexToRgb("zzz")).toBeNull();
  });
});

describe("rgbToHex", () => {
  it("converts", () => {
    expect(rgbToHex({ r: 255, g: 0, b: 0 })).toBe("#ff0000");
  });
});

describe("rgbToHsl", () => {
  it("red", () => {
    expect(rgbToHsl({ r: 255, g: 0, b: 0 })).toEqual({ h: 0, s: 100, l: 50 });
  });
});

describe("parseColor", () => {
  it("parses hex", () => {
    expect(parseColor("#00ff00")).toEqual({ r: 0, g: 255, b: 0 });
  });
  it("parses rgb", () => {
    expect(parseColor("rgb(0, 0, 255)")).toEqual({ r: 0, g: 0, b: 255 });
  });
  it("returns null for invalid", () => {
    expect(parseColor("not a color")).toBeNull();
  });
});