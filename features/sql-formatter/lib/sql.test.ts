import { describe, expect, it } from "vitest";
import { formatSql, minifySql } from "./sql";

describe("formatSql", () => {
  it("uppercases keywords", () => {
    const result = formatSql("select * from users where id = 1");
    expect(result).toContain("SELECT");
    expect(result).toContain("FROM");
    expect(result).toContain("WHERE");
  });

  it("adds newlines for clauses", () => {
    const result = formatSql("select * from users where id = 1");
    expect(result).toContain("\nFROM");
    expect(result).toContain("\nWHERE");
  });

  it("throws on empty", () => {
    expect(() => formatSql("   ")).toThrow();
  });
});

describe("minifySql", () => {
  it("collapses whitespace", () => {
    expect(minifySql("SELECT  *\n  FROM  users")).toBe("SELECT * FROM users");
  });

  it("throws on empty", () => {
    expect(() => minifySql("")).toThrow();
  });
});