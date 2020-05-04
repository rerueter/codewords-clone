const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LexiconSchema = new Schema({
  words: { type: Array },
});

const Lexicon = mongoose.model("Lexicon", LexiconSchema);
module.exports = Lexicon;
