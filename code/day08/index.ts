import fs from 'fs';
import path from 'path';
import { getDigitMapFromPattern, segmentCountToDigit } from './utils';

const input = fs
  .readFileSync(path.join(__dirname, 'input.txt'))
  .toString()
  .split('\n');

interface Signal {
  signalPattern: string[][];
  output: string[];
  solution?: number;
}

const entries = input
  .map((line) => {
    if (!line) return;
    const [signalPatternString, outputString] = line.split('|');

    const signalPattern = signalPatternString
      .trim()
      .split(/\s/)
      .map((s) => s.split('').sort());
    const output = outputString.trim().split(/\s/);

    return {
      signalPattern,
      output,
    };
  })
  .filter((item): item is Signal => !!item);

// Part 1
let count = 0;
entries.forEach((entry) => {
  entry.output.forEach((output) => {
    if (segmentCountToDigit.has(output.length)) {
      count++;
    }
  });
});
console.log('Part 1', count);

// Part 2
let sum = 0;
entries.forEach((entry) => {
  let number = '';
  const patternToDigit = getDigitMapFromPattern(entry.signalPattern);
  entry.output.forEach((output) => {
    const sortedOutput = output.split('').sort().join('');
    const digit = patternToDigit.get(sortedOutput);
    if (digit) {
      number += digit;
    }
  });
  sum += parseInt(number);
});

console.log('Part 2', sum);
