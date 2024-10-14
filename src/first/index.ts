import readline from "readline";
import bossBabyRevenge from "./boss-baby-revenge";

const main = () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question("Input: ", (input) => {
    const result = bossBabyRevenge(input);
    console.log(result);
    rl.close();
  });
};

main();
