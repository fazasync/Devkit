import { describe, expect, it } from "vitest";
import { runRegex } from "./regex";

describe("runRegex", () => {
  it("finds matches", () => {
    const result = runRegex("\\d+", "g", "a1 b22 c");
    expect(result.error).toBeNull();
    expect(result.matches.map((m) => m.match)).toEqual(["1", "22"]);
  });

  it("captures groups", () => {
    const result = runRegex("(\\w+)@(\\w+)", "g", "a@b c@d");
    expect(result.matches[0].groups).toEqual(["a", "b"]);
  });

  it("returns error for invalid pattern", () => {
    const result = runRegex("[", "g", "abc");
    expect(result.error).not.toBeNull();
    expect(result.matches).toHaveLength(0);
  });

  it("handles empty pattern", () => {
    const result = runRegex("", "g", "abc");
    expect(result.matches).toHaveLength(0);
    expect(result.error).toBeNull();
  });

  it("case-insensitive flag", () => {
    const result = runRegex("abc", "gi", "ABC abc");
    expect(result.matches).toHaveLength(2);
  });
});