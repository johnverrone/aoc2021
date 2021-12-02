import fs from 'fs';
import path from 'path';

const instructions = fs
  .readFileSync(path.join(__dirname, 'input.txt'))
  .toString()
  .split('\n');

// Part 1
let pos = 0;
let depth = 0;

instructions.forEach((instruction) => {
  const [direction, stringAmount] = instruction.split(' ');
  const amount = parseInt(stringAmount);

  if (direction === 'forward') pos += amount;
  if (direction === 'up') depth -= amount;
  if (direction === 'down') depth += amount;
});

console.log('Part 1', pos * depth);

// Part 2
pos = 0;
depth = 0;
let aim = 0;

instructions.forEach((instruction) => {
  const [direction, stringAmount] = instruction.split(' ');
  const amount = parseInt(stringAmount);

  if (direction === 'forward') {
    pos += amount;
    depth += aim * amount;
  }
  if (direction === 'up') aim -= amount;
  if (direction === 'down') aim += amount;
});

console.log('Part 2', pos * depth);
