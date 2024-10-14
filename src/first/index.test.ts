import { Result } from "./constant";
import bossBabyRevenge from "./boss-baby-revenge";

describe("bossBabyRevenge", () => {
  test("Example 1: should return Good boy", () => {
    const input = "SRSSRRR";
    const result = bossBabyRevenge(input);
    expect(result).toBe(Result.GoodBoy);
  });

  test("Example 2: should return Bad boy", () => {
    const input = "RSSRR";
    const result = bossBabyRevenge(input);
    expect(result).toBe(Result.BadBoy);
  });

  test("Example 3: should return Bad boy", () => {
    const input = "SSSRRRRS";
    const result = bossBabyRevenge(input);
    expect(result).toBe(Result.BadBoy);
  });

  test("Example 4: should return Bad boy", () => {
    const input = "SRRSSR";
    const result = bossBabyRevenge(input);
    expect(result).toBe(Result.BadBoy);
  });

  test("Example 5: should return Good boy", () => {
    const input = "SSRSRR";
    const result = bossBabyRevenge(input);
    expect(result).toBe(Result.GoodBoy);
  });

  test("should return Good boy when input is empty", () => {
    const input = "";
    const result = bossBabyRevenge(input);
    expect(result).toBe(Result.GoodBoy);
  });

  test("should return Bad boy even revenge more than shot but in the end does not revenge enough", () => {
    const input = "SRRRRRSSR";
    const result = bossBabyRevenge(input);
    expect(result).toBe(Result.BadBoy);
  });

  test("should throw an error for invalid shot types", () => {
    const input = "SSRF";
    expect(() => bossBabyRevenge(input as any)).toThrow("Invalid shot type F");
  });
});
