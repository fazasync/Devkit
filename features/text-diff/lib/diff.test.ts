import { describe, expect, it } from "vitest";
import { diffLines } from "./diff";

describe("diffLines", () => {
  it("returns all same for identical", () => {
    const result = diffLines("a\nb", "a\nb");
    expect(result.every((l) => l.type === "same")).toBe(true);
    expect(result).toHaveLength(2);
  });

  it("detects added lines", () => {
    const result = diffLines("a", "a\nb");
    expect(result).toContainEqual({ type: "added", line: "b" });
  });

  it("detects removed lines", () => {
    const result = diffLines("a\nb", "a");
    expect(result).toContainEqual({ type: "removed", line: "b" });
  });

  it("handles empty inputs", () => {
    const result = diffLines("", "");
    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({ type: "same", line: "" });
  });
});