import fs from 'fs';
import path from 'path';

const input = fs
  .readFileSync(path.join(__dirname, 'input.txt'))
  .toString()
  .split('\n');

const openCharacters = ['(', '[', '{', '<'];
const matchingOpen = new Map([
  [')', '('],
  [']', '['],
  ['}', '{'],
  ['>', '<'],
]);
const points = new Map([
  [')', 3],
  [']', 57],
  ['}', 1197],
  ['>', 25137],
]);

// Part 1
let openStack: string[] = [];
let scores = input.map((line) => {
  const pattern = line.split('');
  for (let i = 0; i < pattern.length; i++) {
    const currOpen = openStack[openStack.length - 1];
    if (openCharacters.includes(pattern[i])) {
      openStack.push(pattern[i]);
    } else if (matchingOpen.get(pattern[i]) === currOpen) {
      openStack.pop();
    } else {
      return points.get(pattern[i]) ?? 0;
    }
  }
  return 0;
});
const sum = scores.reduce((a, b) => a + b, 0);
console.log('Part 1', sum);

// Part 2
const matchingClose = new Map([
  ['(', ')'],
  ['[', ']'],
  ['{', '}'],
  ['<', '>'],
]);
const autocompletePoints = new Map([
  [')', 1],
  [']', 2],
  ['}', 3],
  ['>', 4],
]);

let autocomplete = input.map((line) => {
  openStack = [];
  const pattern = line.split('');
  for (let i = 0; i < pattern.length; i++) {
    const currOpen = openStack[openStack.length - 1];
    if (openCharacters.includes(pattern[i])) {
      openStack.push(pattern[i]);
    } else if (matchingOpen.get(pattern[i]) === currOpen) {
      openStack.pop();
    } else {
      return '';
    }
  }
  const reversed = openStack.slice().reverse();
  const closing = reversed.map((open) => matchingClose.get(open)).join('');
  return closing;
});

const autocompleteScores = autocomplete
  .filter((a) => a.length)
  .map((closing) => {
    let score = 0;
    const closingSymbols = closing.split('');
    closingSymbols.forEach((c) => {
      score = score * 5 + (autocompletePoints.get(c) ?? 0);
    });
    return score;
  });

autocompleteScores.sort((a, b) => a - b);
const middle = Math.floor(autocompleteScores.length / 2);
console.log('Part 2', autocompleteScores[middle]);
