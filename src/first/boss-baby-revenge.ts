import { ShotType, Result } from "./constant";
import { BossBabyRevenge } from "./type";

const bossBabyRevenge: BossBabyRevenge = (input) => {
  if (input[0] === ShotType.Revenge) {
    return Result.BadBoy;
  } else {
    let remainingRevenge = 0;
    for (const shot of input) {
      switch (shot) {
        case ShotType.Revenge: {
          if (remainingRevenge > 0) {
            remainingRevenge--;
          }
          break;
        }
        case ShotType.Shot: {
          remainingRevenge++;
          break;
        }
        default: {
          throw new Error(`Invalid shot type ${shot}`);
        }
      }
    }
    return remainingRevenge === 0 ? Result.GoodBoy : Result.BadBoy;
  }
};

export default bossBabyRevenge;
