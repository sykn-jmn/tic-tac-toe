import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { validator, getWinner } from "./TicTacToeEngine";
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(validator);

app.post("/", (req, res) => {
  const boardState = req.body;
  const winner = getWinner(boardState);
  res.json({ winner: winner });
});

app.listen(8080, () => {
  console.log(`server started at http://localhost:8080`);
});
