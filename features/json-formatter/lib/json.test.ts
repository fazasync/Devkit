import { describe, expect, it } from "vitest";
import { formatJson, minifyJson, validateJson } from "./json";

describe("validateJson", () => {
  it("returns ok for valid JSON", () => {
    const result = validateJson('{"a":1}');
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.value).toEqual({ a: 1 });
  });

  it("returns error for invalid JSON", () => {
    const result = validateJson("{a:1}");
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error.length).toBeGreaterThan(0);
  });

  it("returns error for empty input", () => {
    const result = validateJson("   ");
    expect(result.ok).toBe(false);
  });
});

describe("formatJson", () => {
  it("pretty prints JSON", () => {
    expect(formatJson('{"a":1,"b":2}')).toBe('{\n  "a": 1,\n  "b": 2\n}');
  });

  it("throws on invalid input", () => {
    expect(() => formatJson("{bad}")).toThrow();
  });
});

describe("minifyJson", () => {
  it("minifies JSON", () => {
    expect(minifyJson('{\n  "a": 1\n}')).toBe('{"a":1}');
  });
});