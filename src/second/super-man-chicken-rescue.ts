import { SuperManChickenRescue } from "./type";

const superManChickenRescue: SuperManChickenRescue = ({ n, k, indexes }) => {
  let ans = 0;
  if (indexes.length !== n) {
    throw new Error(
      `Chickens positions array length (${indexes.length}) does not equal n (${n})`
    );
  }
  let left = 0;
  let right = 0;
  while (right < indexes.length) {
    while (indexes[right] - indexes[left] >= k) {
      left++;
    }
    ans = Math.max(ans, right - left + 1);
    right++;
  }

  return ans;
};

export default superManChickenRescue;
