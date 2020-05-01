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

const populate = (input) => {
  for (let i = 0; i < input.length; i++) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `<h4 id='${input[i]}'>${input[i]}</h4>`;
    gameBoard.appendChild(card);
    state.cards.push(card);
  }
  console.log(state.cards);
};

populate(words);

const revealer = (event) => {
  console.log(event.target);
  if (event.target.classList.contains("card")) {
    event.target.classList.toggle("selected");
  }
};
// state.cards[0].classList.toggle("selected");

gameBoard.addEventListener("click", revealer);
