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

const deckBuilder = (input) => {
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
    // console.log(card);
  }
  console.log(state.cards);
};

// this isn't overwriting its input as intended and I'm not sure why.
// const shuffler = (input) => {
//   const shuffled = [];
//   while (input.length > 0) {
//     let i = Math.floor(Math.random() * input.length, 1);
//     shuffled.push(input[i]);
//     input.splice(i, 1);
//   }
//   input = shuffled;
//   console.log(input);
// };

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
  console.log(input);
};

const populater = () => {
  wiper();
  for (let i = 0; i < state.cards.length; i++) {
    const { team, word } = state.cards[i];
    const div = document.createElement("div");
    div.classList.add("card", `${team}`);
    div.innerHTML = `<h3>${word}</h3>`;
    gameBoard.appendChild(div);
  }
};

const wiper = () => {
  while (gameBoard.firstChild) {
    gameBoard.removeChild(gameBoard.lastChild);
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
shuffler(words);
deckBuilder(words);
shuffler(state.cards);
populater();
// console.log(state.cards);
