import { describe, expect, it } from "vitest";
import { generateUuid, generateUuids } from "./uuid";

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

describe("generateUuid", () => {
  it("produces a valid v4 UUID", () => {
    expect(generateUuid()).toMatch(UUID_REGEX);
  });

  it("produces unique values", () => {
    const a = generateUuid();
    const b = generateUuid();
    expect(a).not.toBe(b);
  });
});

describe("generateUuids", () => {
  it("generates requested count", () => {
    expect(generateUuids(5)).toHaveLength(5);
  });

  it("clamps to range", () => {
    expect(generateUuids(0)).toHaveLength(1);
    expect(generateUuids(1000)).toHaveLength(100);
  });

  it("all valid", () => {
    for (const uuid of generateUuids(10)) {
      expect(uuid).toMatch(UUID_REGEX);
    }
  });
});