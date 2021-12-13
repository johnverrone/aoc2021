import fs from 'fs';
import path from 'path';

const input = fs
  .readFileSync(path.join(__dirname, 'input.txt'))
  .toString()
  .split('\n')
  .map((row) => row.split('').map((item) => parseInt(item)));

function isLowPoint(num: number, neighbors: number[]): boolean {
  for (let i = 0; i < neighbors.length; i++) {
    if (num >= neighbors[i]) {
      return false;
    }
  }
  return true;
}

// Part 1
let sum = 0;
let lowPoints: Array<[number, number]> = [];
for (let r = 0; r < input.length; r++) {
  for (let c = 0; c < input[r].length; c++) {
    const neighbors = [
      ...(r > 0 ? [input[r - 1][c]] : []),
      ...(c > 0 ? [input[r][c - 1]] : []),
      ...(c < input[r].length - 1 ? [input[r][c + 1]] : []),
      ...(r < input.length - 1 ? [input[r + 1][c]] : []),
    ];
    if (isLowPoint(input[r][c], neighbors)) {
      lowPoints.push([r, c]);
      sum += input[r][c] + 1;
    }
  }
}
console.log('Part 1', sum);

// Part 2
const basinSizes: number[] = [];
lowPoints.forEach((lowPoint) => {
  let lowPointValue = input[lowPoint[0]][lowPoint[1]];
  let basinQueue: Array<[number, number]> = [];
  let basinSize = 0;
  basinQueue.push(lowPoint);
  while (basinQueue.length) {
    let n = basinQueue.shift();
    if (!n) break;
    const [r, c] = n;
    if (input[r][c] >= lowPointValue && input[r][c] < 9) {
      basinSize++;
      input[r][c] = -1;
      if (r > 0 && input[r - 1][c] < 9) basinQueue.push([r - 1, c]);
      if (c > 0 && input[r][c - 1] < 9) basinQueue.push([r, c - 1]);
      if (c < input[r].length - 1 && input[r][c + 1] < 9)
        basinQueue.push([r, c + 1]);
      if (r < input.length - 1 && input[r + 1][c] < 9)
        basinQueue.push([r + 1, c]);
    }
  }
  basinSizes.push(basinSize);
});

const largestBasins = basinSizes
  .sort((a, b) => a - b)
  .slice(basinSizes.length - 3);

console.log(
  'Part 2',
  largestBasins.reduce((a, b) => a * b, 1)
);
