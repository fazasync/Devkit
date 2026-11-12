import { describe, expect, it } from "vitest";
import { searchTools } from "./search";
import { TOOLS } from "@/config/tool-registry";

describe("searchTools", () => {
  it("returns all tools when query is empty", () => {
    const result = searchTools("", TOOLS);
    expect(result).toHaveLength(TOOLS.length);
  });

  it("returns all tools when query is whitespace", () => {
    const result = searchTools("   ", TOOLS);
    expect(result).toHaveLength(TOOLS.length);
  });

  it("matches by name", () => {
    const result = searchTools("json formatter", TOOLS);
    expect(result.some((tool) => tool.id === "json-formatter")).toBe(true);
  });

  it("matches by keyword", () => {
    const result = searchTools("uuid", TOOLS);
    expect(result.some((tool) => tool.id === "uuid-generator")).toBe(true);
  });

  it("returns empty array when no match", () => {
    const result = searchTools("zzzz-not-a-tool", TOOLS);
    expect(result).toHaveLength(0);
  });

  it("requires all terms to match", () => {
    const result = searchTools("json quantum", TOOLS);
    expect(result).toHaveLength(0);
  });
});