console.log("main.js");

const state = {
  cards: [],
  turn: "",
};

const gameBoard = document.getElementById("gameboard");

const words = [
  "hello",
  "there",
  "I",
  "am",
  "appending",
  "words",
  "to",
  "the",
  "dom",
  "and",
  "it's",
  "cool",
  "but",
  "I",
  "have",
  "a",
  "feeling",
  "it'll",
  "get",
  "complicated",
];

const deckBuild = (input) => {
  let count = 0;
  for (let i = 0; i < input.length; i++) {
    const card = {};
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
    console.log(card);
  }
};

const shuffler = () => {
  const tempCards = [];
  const cards = state.cards;
  for (let i = 0; i < cards.length; i++) {
    const removed = cards[Math.random(cards.length)];
  }
};

const populater = () => {
  for (let i = 0; i < state.cards.length; i++) {
    const { team, word } = state.cards[i];
    const div = document.createElement("div");
    div.classList.add("card", `${team}`);
    div.innerHTML = `<h3>${word}</h3>`;
    gameBoard.appendChild(div);
  }
};

const revealer = (event) => {
  console.log(event.target);
  if (
    event.target.classList.contains("card") &&
    !event.target.classList.contains("selected")
  ) {
    event.target.classList.toggle("selected");
  }
};
// state.cards[0].classList.toggle("selected");

gameBoard.addEventListener("click", revealer);

//__________________________________________________Invoked Functions
deckBuild(words);
populater();
// console.log(state.cards);
