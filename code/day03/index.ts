import fs from 'fs';
import path from 'path';

const diagnostics = fs
  .readFileSync(path.join(__dirname, 'input.txt'))
  .toString()
  .split('\n');

// Part 1
let gamma = 0;
let epsilon = 0;

const oneCount = Array.from({ length: diagnostics[0].length }, () => 0);

diagnostics.forEach((d) => {
  const bits = d.split('');

  oneCount.forEach((_, idx) => {
    if (bits[idx] === '1') oneCount[idx]++;
  });
});

const mostCommon = oneCount
  .map((d) => (d >= diagnostics.length / 2 ? 1 : 0))
  .join('');

const leastCommon = mostCommon
  .split('')
  .map((d) => (d === '1' ? '0' : '1'))
  .join('');

gamma = parseInt(mostCommon, 2);
epsilon = parseInt(leastCommon, 2);

console.log('Part 1', gamma * epsilon);

// Part 2
function filter(
  oxygenList: string[],
  co2List: string[],
  index: number = 0
): number {
  let oxygenIdentifier = '';
  let co2Identifier = '';

  if (oxygenList.length <= 1 && co2List.length <= 1) {
    return parseInt(oxygenList[0], 2) * parseInt(co2List[0], 2);
  }
  if (oxygenList.length > 1) {
    let ones = 0;
    let zeros = 0;
    oxygenList.forEach((d) => (d[index] === '1' ? ones++ : zeros++));
    if (ones >= zeros) {
      oxygenIdentifier = '1';
    } else {
      oxygenIdentifier = '0';
    }
  }
  if (co2List.length > 1) {
    let ones = 0;
    let zeros = 0;
    co2List.forEach((d) => (d[index] === '1' ? ones++ : zeros++));
    if (ones >= zeros) {
      co2Identifier = '0';
    } else {
      co2Identifier = '1';
    }
  }

  const newOxygenList =
    oxygenList.length > 1
      ? oxygenList.filter(
          (diagnostic) => diagnostic[index] === oxygenIdentifier
        )
      : oxygenList;
  const newCo2List =
    co2List.length > 1
      ? co2List.filter((diagnostic) => diagnostic[index] === co2Identifier)
      : co2List;

  return filter(newOxygenList, newCo2List, index + 1);
}

const output = filter(diagnostics, diagnostics);

console.log('Part 2', output);
