# Superman's Chicken Rescue

Overview

- This application solves the Super Man Chicken Rescue problem, where the goal is to determine how many chickens can be saved based on their positions and a given distance limit.

Files

- super-man-chicken-rescue.ts: Contains the core logic to calculate the maximum number of chickens that can be saved within a given distance.
- index.ts: Handles user input and interacts with the superManChickenRescue function.
- index.test.ts: Includes Jest test cases to validate functionality.
- type.ts: Contains the type definitions used across the module.

Assumptions

- The user provides valid input for n (number of chickens), k (maximum distance), and chicken positions.

Approach

- The program reads n, k, and a list of chicken positions. It then determines the largest number of chickens that can be rescued, where the distance between the farthest and nearest chickens in a group is less than k. Using a sliding window approach, the positions are processed to find the maximum group size.
- Sliding window is a technique that I learned while grinding leetcode. The brute force approach is looping through each chicken positions and then looping through next positions until it exceeds maximum distance which we will endup accessing each positions more than twice. But sliding window technique allows us to move the right pointer first then closer the left pointer only when different between left and right indexes is exceed maximum distance which make us accesing each positions twice at most .This technique time complexity O(n) is better than Brute force approach O(n^2).

Features

- Input: Number of chickens (n), maximum distance (k), and chicken positions.
- Logic: It uses a sliding window to count how many chickens can be saved while ensuring the distance between the farthest and nearest chickens in the group is less than k.
- Output: The maximum number of chickens that can be saved.

Test Cases

- Example 1:
  Input: n=5, k=5, indexes=[2, 5, 10, 12, 15]
  Expected output: 2
- Example 2:
  Input: n=6, k=10, indexes=[1, 11, 30, 34, 35, 37]
  Expected output: 4
- Example with mismatched n:
  Input: n=5, k=5, indexes=[2, 5, 10]
  Expected to throw an error.
- Single chicken:
  Input: n=1, k=10, indexes=[5]
  Expected output: 1
- Super man can not carry roof:
  Input: n=5, k=0, indexes=[2, 5, 10, 12, 15]
  Expected output: 0
- Super man carry big roof:
  Input: n=5, k=0, indexes=[2, 5, 10, 12, 15]
  Expected output: 0

How to Run

- Install dependencies using npm install.
- Build executable js files using npm run build
- Run the application using npm run second.
- For testing, use npm test.
