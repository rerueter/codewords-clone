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

const getGame = (name) => {
  fetch(`/api/v1/games/search/${state.name}`, { method: "GET" })
    .then((res) => res.json())
    .then((gameObj) => {
      state.cards = gameObj.data.cards;
      state.id = gameObj.data._id;
      state.scoreA = gameObj.data.scoreA;
      state.scoreB = gameObj.data.scoreB;
      populate();
    });
};

const updateGame = () => {
  const outgoing = {
    cards: state.cards,
    scoreA: state.scoreA,
    scoreB: state.scoreB,
  };
  fetch(`/api/v1/games/${state.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(outgoing),
  })
    .then((res) => res.json())
    .then((updated) => {
      console.log(updated);
    });
};

const populate = () => {
  wiper();
  const scoreA = document.getElementById("aCount");
  const scoreB = document.getElementById("bCount");
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
  scoreA.innerText = state.scoreA;
  scoreB.innerText = state.scoreB;
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
  const scoreA = document.getElementById("aCount");
  const scoreB = document.getElementById("bCount");
  // console.log(event.target);
  if (
    event.target.classList.contains("card") &&
    !event.target.classList.contains("selected")
  ) {
    event.target.classList.add("selected");
    state.cards[event.target.dataset.number].selected = true;
    if (event.target.classList.contains("A")) {
      state.scoreA -= 1;
      scoreA.innerText = state.scoreA;
    }
    if (event.target.classList.contains("B")) {
      state.scoreB -= 1;
      scoreB.innerText = state.scoreB;
    }
    // console.log(state.cards[event.target.dataset.number]);
    updateGame();
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
getGame();
