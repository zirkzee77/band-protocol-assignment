import superManChickenRescue from "./super-man-chicken-rescue";

describe("superManChickenRescue", () => {
  test("Example 1: should return 2", () => {
    const input = { n: 5, k: 5, indexes: [2, 5, 10, 12, 15] };
    const result = superManChickenRescue(input);
    expect(result).toBe(2);
  });

  test("Example 2: should return 4", () => {
    const input = { n: 6, k: 10, indexes: [1, 11, 30, 34, 35, 37] };
    const result = superManChickenRescue(input);
    expect(result).toBe(4);
  });

  test("should throw an error if the indexes length does not equal n", () => {
    const input = { n: 5, k: 5, indexes: [2, 5, 10] };
    expect(() => superManChickenRescue(input)).toThrow(
      "Chickens positions array length (3) does not equal n (5)"
    );
  });

  test("should return 1 with only one chicken", () => {
    const input = { n: 1, k: 10, indexes: [5] };
    const result = superManChickenRescue(input);
    expect(result).toBe(1);
  });

  test("should return 0 when superman can not carry roof", () => {
    const input = { n: 5, k: 0, indexes: [2, 5, 10, 12, 15] };
    const result = superManChickenRescue(input);
    expect(result).toBe(0);
  });

  test("should return all of the chickens when superman carry big roof", () => {
    const input = { n: 5, k: 100, indexes: [2, 5, 10, 12, 15] };
    const result = superManChickenRescue(input);
    expect(result).toBe(5);
  });
});
