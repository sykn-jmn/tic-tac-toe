import { NextFunction, Request, Response } from "express";
import CellState from "./CellState";

const lineIsWinner = (cell1: CellState, cell2: CellState, cell3: CellState) => {
  return cell1 != CellState.EMPTY && cell1 == cell2 && cell2 == cell3;
};

const validator = (req: Request, res: Response, next: NextFunction) => {
  if (!req.body) throw new Error("Response Body Not Present");
  let state = req.body;
  if (state.length != 3) throw new Error("Invalid Board Shape");
  if (state[0].length != 3) throw new Error("Invalid Board Shape");
  if (state[1].length != 3) throw new Error("Invalid Board Shape");
  if (state[2].length != 3) throw new Error("Invalid Board Shape");
  let crossCount = 0;
  let circleCount = 0;
  for (let rowIdx = 0; rowIdx < 3; rowIdx++) {
    for (let colIdx = 0; colIdx < 3; colIdx++) {
      if (state[rowIdx][colIdx] < 0 || state[rowIdx][colIdx] > 2)
        return new Error(
          "Invalid Cell State. Must be between 0 and 2. Instead got " +
            state[rowIdx][colIdx]
        );
      if (state[rowIdx][colIdx] == CellState.CIRCLE) circleCount++;
      if (state[rowIdx][colIdx] == CellState.CROSS) crossCount++;
    }
  }
  if (crossCount > circleCount + 1) {
    throw new Error("Invalid Board State");
  }
  if (circleCount > crossCount) {
    throw new Error("Invalid Board State");
  }
  next();
};

const getWinner = (state: Array<Array<CellState>>) => {
  //Check for each row
  for (let rowIdx = 0; rowIdx < 3; rowIdx++) {
    let row = state[rowIdx];
    if (lineIsWinner(row[0], row[1], row[2])) {
      return row[0];
    }
  }

  //Check for each column
  for (let colIdx = 0; colIdx < 3; colIdx++) {
    if (lineIsWinner(state[0][colIdx], state[1][colIdx], state[2][colIdx])) {
      return state[0][colIdx];
    }
  }

  //Check diagonals
  if (lineIsWinner(state[0][0], state[1][1], state[2][2])) {
    return state[0][0];
  }
  if (lineIsWinner(state[2][0], state[1][1], state[0][2])) {
    return state[2][0];
  }
};

export { validator, getWinner };
