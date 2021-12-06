import fs from 'fs';
import path from 'path';

const input = fs
  .readFileSync(path.join(__dirname, 'input.txt'))
  .toString()
  .split(',');

// Part 1
let fish = [...input.map((i) => parseInt(i))];

for (let day = 0; day < 80; day++) {
  const newFish: number[] = [];
  for (let x = 0; x < fish.length; x++) {
    let f = fish[x] - 1;
    if (f < 0) {
      f = 6;
      newFish.push(8);
    }
    newFish.push(f);
  }
  fish = newFish;
}

console.log('Part 1', fish.length);

// Part 2
type FishMap = { [key: number]: number };
const initialFishMap: FishMap = {
  0: 0,
  1: 0,
  2: 0,
  3: 0,
  4: 0,
  5: 0,
  6: 0,
  7: 0,
  8: 0,
};

const fishByLife = input.reduce<FishMap>((fish, curr) => {
  const currentLife = parseInt(curr);
  const currentCount = fish[currentLife] ?? 0;
  return {
    ...fish,
    [currentLife]: currentCount + 1,
  };
}, initialFishMap);

for (let day = 0; day < 2; day++) {
  console.log(fishByLife);
  const fishToBeBorn = fishByLife[0];
  for (let i = 0; i < 8; i++) {
    fishByLife[i] = fishByLife[i + 1];
    if (i === 6) {
      fishByLife[i] += fishToBeBorn;
    }
  }
  fishByLife[8] = fishToBeBorn;
}

const sum = Object.values(fishByLife)
  .map((count) => count ?? 0)
  .reduce((a, b) => a + b);

console.log('Part 2', sum);
