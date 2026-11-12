import { describe, expect, it } from "vitest";
import { convertCase } from "./case";

describe("convertCase", () => {
  it("camelCase", () => {
    expect(convertCase("hello world", "camel")).toBe("helloWorld");
  });
  it("PascalCase", () => {
    expect(convertCase("hello world", "pascal")).toBe("HelloWorld");
  });
  it("snake_case", () => {
    expect(convertCase("hello world", "snake")).toBe("hello_world");
  });
  it("kebab-case", () => {
    expect(convertCase("hello world", "kebab")).toBe("hello-world");
  });
  it("CONSTANT_CASE", () => {
    expect(convertCase("hello world", "constant")).toBe("HELLO_WORLD");
  });
  it("upper", () => {
    expect(convertCase("hello", "upper")).toBe("HELLO");
  });
  it("lower", () => {
    expect(convertCase("HELLO", "lower")).toBe("hello");
  });
  it("title", () => {
    expect(convertCase("hello world", "title")).toBe("Hello World");
  });
});