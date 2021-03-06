const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const gameSchema = new Schema({
  name: { type: String },
  cards: [],
  turn: { type: String },
  scoreA: { type: Number },
  scoreB: { type: Number },
});

const Game = mongoose.model("Game", gameSchema);
module.exports = Game;
