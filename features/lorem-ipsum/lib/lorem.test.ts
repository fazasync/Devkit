import { describe, expect, it } from "vitest";
import {
  generateLoremParagraphs,
  generateLoremSentences,
  generateLoremWords,
} from "./lorem";

describe("generateLoremWords", () => {
  it("count", () => {
    expect(generateLoremWords(5).split(" ")).toHaveLength(5);
  });
  it("clamps", () => {
    expect(generateLoremWords(0).split(" ").length).toBe(1);
  });
});

describe("generateLoremSentences", () => {
  it("count", () => {
    const result = generateLoremSentences(3);
    expect((result.match(/\./g) || []).length).toBe(3);
  });
});

describe("generateLoremParagraphs", () => {
  it("count", () => {
    const result = generateLoremParagraphs(2);
    expect(result.split("\n\n")).toHaveLength(2);
  });
});