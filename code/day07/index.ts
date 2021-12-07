import fs from 'fs';
import path from 'path';

const input = fs
  .readFileSync(path.join(__dirname, 'input.txt'))
  .toString()
  .split(',');

const crabPositions = input.map((i) => parseInt(i));
const minPos = Math.min(...crabPositions);
const maxPos = Math.max(...crabPositions);

// Part 1
let cheapest = Number.MAX_VALUE;
for (let pos = minPos; pos <= maxPos; pos++) {
  let distance = 0;
  for (let crab = 0; crab < crabPositions.length; crab++) {
    distance += Math.abs(crabPositions[crab] - pos);
  }
  if (distance < cheapest) {
    cheapest = distance;
  }
}
console.log('Part 1', minPos, maxPos, cheapest);

// Part 2
cheapest = Number.MAX_VALUE;
for (let pos = minPos; pos <= maxPos; pos++) {
  let cost = 0;
  for (let crab = 0; crab < crabPositions.length; crab++) {
    let distance = Math.abs(crabPositions[crab] - pos);
    cost += (distance ** 2 + distance) / 2;
  }
  if (cost < cheapest) {
    cheapest = cost;
  }
}
console.log('Part 2', cheapest);
