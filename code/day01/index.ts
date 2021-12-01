import fs from 'fs';
import path from 'path';

const nums = fs
  .readFileSync(path.join(__dirname, 'input.txt'))
  .toString()
  .split('\n');

// Part 1
let count = 0;
let prev = Number.MAX_SAFE_INTEGER;

nums.forEach((n) => {
  const number = parseInt(n);
  if (number > prev) {
    count++;
  }
  prev = number;
});

console.log('Part 1', count);

// Part 2
count = 0;
let prevSum = Number.MAX_SAFE_INTEGER;

nums.forEach((n, i) => {
  if (i >= nums.length - 2) return;
  const n1 = parseInt(n);
  const n2 = parseInt(nums[i + 1]);
  const n3 = parseInt(nums[i + 2]);
  const sum = n1 + n2 + n3;

  if (sum > prevSum) {
    count++;
  }
  prevSum = sum;
});

console.log('Part 2', count);
