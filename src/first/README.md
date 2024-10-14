# Boss Baby's Revenge

Overview

- This application solves the Boss Baby Revenge problem, where the goal is to determine whether the Boss Baby is a "Good Boy" or "Bad Boy" based on a sequence of shots.

Files

- boss-baby-revenge.ts: Contains the core logic to determine the outcome of the shots sequence.
- index.ts: Handles user input and interacts with the bossBabyRevenge function.
- index.test.ts: Includes Jest test cases to validate the functionality.
- constant.ts: Contains enum of shot types and results
- type.ts: Contains the type definitions used across the module.

Assumptions

- The user provides valid input string of shots

Approach

- The input sequence is processed by counting the number of shot shots (S). Whenever a revenge shot (R) occurs, the count of shot shots is reduced, but it cannot drop below zero. This is because the Boss Baby doesn’t track his overall shot count, he only cares about how many times he’s been shot at that moment. The logic ensures that revenge shots are handled without deducting more than what has been "earned" through shot shots. This way, only valid retributions are accounted for.

Features

- Input: A string of shots.
- Logic: The function processes the sequence to determine if the Boss Baby is a "Good Boy" or a "Bad Boy" based on the number of revenge shots compared to shot shots.
- Output: The result will be either "Good Boy" or "Bad Boy".

Test cases

- Example 1:
  Input: SRSSRRR
  Expected output: Good Boy
- Example 2:
  Input: RSSRR
  Expected output: Bad Boy
- Example 3:
  Input: SSSRRRRS
  Expected output: Bad Boy
- Example 4:
  Input: SRRSSR
  Expected output: Bad Boy
- Example 5:
  Input: SSRSRR
  Expected output: Good Boy
- Empty string
  Input:
  Expected output: Good Boy
- Revenge more than shot but in the end does not revenge enough:
  Input: SRRRRRSSR
  Expected output: Bad Boy
- Invalid shot type: SSRF

How to Run

- Install dependencies using npm install.
- Build executable js files using npm run build
- Run the application using npm run first.
- For testing, use npm test.
