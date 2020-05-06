console.log("game.js");

const state = {
  cards: [],
  turn: "",
  scoreA: 0,
  scoreB: 0,
};

const gameBoard = document.getElementById("gameboard");

let words = [];

// dummy lexicon collection ids
// 5eb0c5b52a8e2446037ee7dc - initial
// 5eb1d64d4575ba5e6bcd4034 - nature

const getWords = async () => {
  let lexicon = await fetch("/api/v1/lexicon/5eb1d64d4575ba5e6bcd4034", {
    method: "GET",
  })
    .then((words) => words.json())
    .then((wordsObj) => {
      return wordsObj.data;
    });
  deckBuilder(shuffler(lexicon));
  state.cards = shuffler(state.cards);
  populate();
};

const deckBuilder = (input) => {
  let count = 0;
  for (let i = 0; i < input.length; i++) {
    const card = {};
    if (count === 20) {
      return;
    }
    if (count === 0) {
      card.team = "gameOver";
    } else if (count > 0 && count < 8) {
      card.team = "A";
    } else if (count >= 8 && count < 14) {
      card.team = "B";
    } else card.team = "Neutral";
    card.word = input[i];
    card.number = i + 1;
    count++;
    state.cards.push(card);
  }
  state.cards = shuffler(state.cards);
  console.table(state.cards);
};

const shuffler = (input) => {
  const shuffled = [];

  while (input.length > 0) {
    let i = Math.floor(Math.random() * input.length, 1);
    shuffled.push(input[i]);
    input.splice(i, 1);
  }
  for (let i = 0; i < shuffled.length; i++) {
    input.push(shuffled[i]);
  }
  return shuffled;
};

const populate = () => {
  wiper();
  for (let i = 0; i < state.cards.length; i++) {
    const { team, word } = state.cards[i];
    const div = document.createElement("div");
    div.classList.add("card", `${team}`);
    if (state.cards[i].selected === true) {
      div.classList.add("selected");
    }
    div.innerHTML = `<h3>${word}</h3>`;
    div.dataset.number = `${i}`;
    gameBoard.appendChild(div);
  }
};

const wiper = () => {
  while (gameBoard.firstChild) {
    gameBoard.removeChild(gameBoard.lastChild);
  }
  console.log(state.cards);
};
const hardWipe = () => {
  wiper();
  state.cards = [];
};

const handleSelect = (event) => {
  // console.log(event.target);
  if (
    event.target.classList.contains("card") &&
    !event.target.classList.contains("selected")
  ) {
    event.target.classList.add("selected");
    state.cards[event.target.dataset.number].selected = true;
    // console.log(state.cards[event.target.dataset.number]);
  }
};

const reveal = () => {
  const cards = document.querySelectorAll("h3");
  const spymaster = document.getElementById("spymaster");
  cards.forEach((card) => card.classList.toggle("spymaster"));
  spymaster.classList.toggle("active");
};

//___________________________________________________ Event Listeners
gameBoard.addEventListener("click", handleSelect);

//____________________________________________________ Test Utilities
document.getElementById("new").addEventListener("click", getWords);
document.getElementById("clear").addEventListener("click", wiper);
document.getElementById("populate").addEventListener("click", populate);
document.getElementById("spymaster").addEventListener("click", reveal);

//__________________________________________________Invoked Functions
getWords();
