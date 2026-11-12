import { describe, expect, it } from "vitest";
import {
  dateToTimestamp,
  formatIso,
  timestampToDate,
} from "./timestamp";

describe("timestampToDate", () => {
  it("converts seconds", () => {
    const date = timestampToDate("1700000000", "seconds");
    expect(formatIso(date)).toBe("2023-11-14T22:13:20.000Z");
  });

  it("converts milliseconds", () => {
    const date = timestampToDate("1700000000000", "milliseconds");
    expect(formatIso(date)).toBe("2023-11-14T22:13:20.000Z");
  });

  it("throws on empty", () => {
    expect(() => timestampToDate("")).toThrow();
  });

  it("throws on invalid", () => {
    expect(() => timestampToDate("abc")).toThrow();
  });
});

describe("dateToTimestamp", () => {
  it("converts to seconds", () => {
    expect(dateToTimestamp("2023-11-14T22:13:20.000Z", "seconds")).toBe(1700000000);
  });

  it("converts to milliseconds", () => {
    expect(dateToTimestamp("2023-11-14T22:13:20.000Z", "milliseconds")).toBe(
      1700000000000,
    );
  });

  it("throws on invalid date", () => {
    expect(() => dateToTimestamp("not-a-date")).toThrow();
  });
});