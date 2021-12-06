import fs from 'fs';
import path from 'path';
import { checkForWinner, getBoards, markCalled } from './utils';

const lines = fs
  .readFileSync(path.join(__dirname, 'input.txt'))
  .toString()
  .split('\n');

const drawnNumbers = lines
  .splice(0, 2)[0]
  .split(',')
  .map((n) => parseInt(n));

let boards = getBoards(lines);

// Part 1
let currIndex = 0;
let winningBoard: number[] | null = null;
while (!winningBoard) {
  for (let i = 0; i < boards.length; i++) {
    const b = boards[i];
    markCalled(b, drawnNumbers[currIndex]);
    if (checkForWinner(b)) {
      winningBoard = b;
      break;
    }
  }
  currIndex++;
}

// sum winning board unmarked numbers
let sum = winningBoard.reduce((acc, curr) => {
  if (curr > 0) return acc + curr;
  return acc;
}, 0);

console.log('Part 1', sum * drawnNumbers[currIndex - 1]);

// Part 2
boards = getBoards(lines);
currIndex = 0;
let lastDrawn = -1;
while (currIndex < drawnNumbers.length) {
  for (let i = 0; i < boards.length; i++) {
    markCalled(boards[i], drawnNumbers[currIndex]);
  }
  for (let i = 0; i < boards.length; i++) {
    const b = boards[i];
    if (checkForWinner(b)) {
      winningBoard = b;
      lastDrawn = drawnNumbers[currIndex];
      boards.splice(i, 1);
    }
  }
  currIndex++;
}

// sum winning board unmarked numbers
sum = winningBoard.reduce((acc, curr) => {
  if (curr > 0) return acc + curr;
  return acc;
}, 0);

console.log('Part 2', sum, lastDrawn, sum * lastDrawn);
