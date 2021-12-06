import fs from 'fs';
import path from 'path';

const input = fs
  .readFileSync(path.join(__dirname, 'input.txt'))
  .toString()
  .split('\n');

interface Line {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

type MapPoint = number | '.';

const lines: Line[] = input.map((i) => {
  const [start, end] = i.split('->', 2);
  const [x1, y1] = start.trim().split(',');
  const [x2, y2] = end.trim().split(',');
  return {
    x1: parseInt(x1),
    x2: parseInt(x2),
    y1: parseInt(y1),
    y2: parseInt(y2),
  };
});

// Part 1
const grid: MapPoint[][] = Array(1000)
  .fill('.')
  .map(() => new Array(1000).fill('.'));

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (line.x1 === line.x2 || line.y1 === line.y2) {
    drawLine(grid, line);
  }
}

function drawLine(grid: MapPoint[][], line: Line) {
  if (line.x1 === line.x2) {
    // draw vertical line
    const c = line.x1;
    const start = Math.min(line.y1, line.y2);
    const end = Math.max(line.y1, line.y2);
    for (let r = start; r <= end; r++) {
      const point = grid[r][c];
      grid[r][c] = point === '.' ? 1 : point + 1;
    }
  }
  if (line.y1 === line.y2) {
    // draw horizontal line
    const r = line.y1;
    const start = Math.min(line.x1, line.x2);
    const end = Math.max(line.x1, line.x2);
    for (let c = start; c <= end; c++) {
      const point = grid[r][c];
      grid[r][c] = point === '.' ? 1 : point + 1;
    }
  }
  if (line.x1 !== line.x2 && line.y1 !== line.y2) {
    // draw diagonal line
    const xInc = line.x2 > line.x1;
    const yInc = line.y2 > line.y1;
    const length = Math.abs(line.x2 - line.x1) + 1;

    let r = line.y1;
    let c = line.x1;
    for (let l = 1; l <= length; l++) {
      const point = grid[r][c];
      grid[r][c] = point === '.' ? 1 : point + 1;
      r = yInc ? r + 1 : r - 1;
      c = xInc ? c + 1 : c - 1;
    }
  }
}

let sum = 0;
for (let r = 0; r < grid.length; r++) {
  for (let c = 0; c < grid[r].length; c++) {
    if (grid[r][c] >= 2) {
      sum++;
    }
  }
}

console.log('Part 1', sum);

// Part 2
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (line.x1 !== line.x2 && line.y1 !== line.y2) {
    drawLine(grid, line);
  }
}

sum = 0;
for (let r = 0; r < grid.length; r++) {
  for (let c = 0; c < grid[r].length; c++) {
    if (grid[r][c] >= 2) {
      sum++;
    }
  }
}

console.log('Part 2', sum);
