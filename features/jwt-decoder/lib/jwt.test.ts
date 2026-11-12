import { describe, expect, it } from "vitest";
import { decodeJwt, formatClaimDate } from "./jwt";

const SAMPLE =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

describe("decodeJwt", () => {
  it("decodes a valid JWT", () => {
    const result = decodeJwt(SAMPLE);
    expect(result.header).toEqual({ alg: "HS256", typ: "JWT" });
    expect(result.payload).toMatchObject({ sub: "1234567890", name: "John Doe" });
    expect(result.signature.length).toBeGreaterThan(0);
  });

  it("throws on empty input", () => {
    expect(() => decodeJwt("   ")).toThrow();
  });

  it("throws on wrong number of parts", () => {
    expect(() => decodeJwt("a.b")).toThrow();
  });

  it("throws on invalid header", () => {
    expect(() => decodeJwt("!!!.eyJhIjoxfQ.sig")).toThrow();
  });
});

describe("formatClaimDate", () => {
  it("formats numeric seconds", () => {
    expect(formatClaimDate(1516239022)).toBe("2018-01-18T01:30:22.000Z");
  });

  it("returns null for non-number", () => {
    expect(formatClaimDate("x")).toBeNull();
    expect(formatClaimDate(NaN)).toBeNull();
  });
});