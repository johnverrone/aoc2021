export function getBoards(lines: string[]): number[][] {
  let boards: number[][] = [];
  let buffer: string[] = [];
  lines.forEach((line) => {
    if (line === '') {
      boards.push(
        buffer.reduce<number[]>(
          (acc, row) => [
            ...acc,
            ...row
              .trim()
              .split(/\s+/)
              .map((n) => parseInt(n)),
          ],
          []
        )
      );
      buffer = [];
      return;
    }
    buffer.push(line);
  });
  return boards;
}

export function markCalled(board: number[], calledNumber: number): void {
  for (let i = 0; i < board.length; i++) {
    const v = board[i];
    if (v === calledNumber) {
      board[i] = -1;
      return;
    }
  }
}

export function checkForWinner(board: number[]): boolean {
  const boardSize = Math.sqrt(board.length);
  for (let r = 0; r < board.length; r += boardSize) {
    const rowSum = board.slice(r, r + boardSize).reduce((a, b) => a + b);
    if (rowSum === boardSize * -1) return true;
  }

  for (let c = 0; c < boardSize; c++) {
    let colValues: number[] = [];
    for (let r = 0; r < boardSize; r++) {
      colValues.push(board[r * boardSize + c]);
    }
    const colSum = colValues.reduce((a, b) => a + b);
    if (colSum === boardSize * -1) return true;
  }
  return false;
}
