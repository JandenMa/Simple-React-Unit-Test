import { add, sub, multi, div, factorial } from "./calc.util";

describe("Test Calc", () => {
  // This is the Mocha pattern, and the Jest engine can compatible with it directly
  it("Test add function", () => {
    expect(add(1, 2)).toBe(3);
  });
  it("Test sub function", () => {
    expect(sub(4, 2)).toBe(2);
  });
  it("Test multi function", () => {
    expect(multi(5, 2)).toBe(10);
  });
  it("Test div function", () => {
    expect(div(6, 0)).toBeNull();
    expect(div(6, 2)).toBeCloseTo(3);
  });
  it("Test factorial function", () => {
    expect(factorial(0)).toBe(1);
    expect(factorial(5)).toBe(120);
  });
});
