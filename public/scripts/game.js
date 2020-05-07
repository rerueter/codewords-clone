console.log("game.js");

const state = {
  name: "",
  cards: [],
  turn: "",
  scoreA: 0,
  scoreB: 0,
  spymaster: false,
};

const gameBoard = document.getElementById("gameboard");

const getGame = async (name) => {
  fetch(`/api/v1/games/search/${name}`, { method: "GET" })
    .then((res) => res.json())
    .then((gameObj) => {
      state.cards = gameObj.data[0].cards;
      populate();
    });
};

const updateGame = async () => {};

const populate = () => {
  wiper();
  for (let i = 0; i < state.cards.length; i++) {
    const { team, word } = state.cards[i];
    const div = document.createElement("div");
    div.classList.add("card", `${team}`);
    div.innerHTML = `<h3>${word}</h3>`;
    if (state.cards[i].selected === true) {
      div.classList.add("selected");
    }
    if (state.spymaster === true) {
      div.firstChild.classList.add("spymaster");
    }
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
  state.spymaster = !state.spymaster;
  console.log(state.spymaster);
};

//___________________________________________________ Event Listeners
gameBoard.addEventListener("click", handleSelect);

//____________________________________________________ Test Utilities
// document.getElementById("new").addEventListener("click", getWords);
document.getElementById("clear").addEventListener("click", wiper);
document.getElementById("populate").addEventListener("click", populate);
document.getElementById("spymaster").addEventListener("click", reveal);

//__________________________________________________Invoked Functions
state.name = localStorage.getItem("name");
getGame(state.name);
