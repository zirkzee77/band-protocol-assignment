import readline from "readline";
import superManChickenRescue from "./super-man-chicken-rescue";

const main = () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  let n: number, k: number;
  let indexes: number[];
  rl.question("Input n and k: ", (firstAnswer) => {
    [n, k] = firstAnswer.split(" ").map(Number);

    rl.question("Input chicken positions: ", (secondAnswer) => {
      indexes = secondAnswer.split(" ").map(Number);
      const answer = superManChickenRescue({ n, k, indexes });
      console.log(answer);
      rl.close();
    });
  });
};

main();
