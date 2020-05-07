console.log("main.js");

const game = {};

const getWords = async () => {
  const words = await fetch("/api/v1/lexicon/5eb1d64d4575ba5e6bcd4034", {
    method: "GET",
  })
    .then((res) => res.json())
    .then((wordsObj) => {
      return wordsObj.data;
    });
  // console.log(words);
  game.words = shuffler(words);
  // console.log(game.words);
  game.cards = deckBuilder(game.words);
  console.table(game.cards);
};

const deckBuilder = (input) => {
  let cards = [];
  let count = 0;
  while (count < 20) {
    const card = {};
    if (count === 0) {
      card.team = "gameOver";
    } else if (count > 0 && count < 8) {
      card.team = "A";
    } else if (count >= 8 && count < 14) {
      card.team = "B";
    } else card.team = "Neutral";
    card.word = input[count];
    count++;
    cards.push(card);
  }
  cards = shuffler(cards);
  return cards;
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

const handleModal = (event) => {
  console.log(event.target.id);
  const modal = document.getElementById(`${event.target.id}Modal`);
  modal.classList.toggle("hidden");
};

const clearErr = (event) => {
  console.log(event);
  const errors = document.querySelectorAll(".errmsg");
  console.log(errors);
  errors.forEach((error) => {
    error.remove();
  });
};

const createGame = () => {
  game.name = document.getElementById("newName").value;
  if (game.name === "") {
    return;
  } else {
    console.log(game);
    fetch("/api/v1/games", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(game),
    })
      .then((res) => {
        console.log(res.status);
        if (res.status !== 201) {
          const newGameModal = document.getElementById("newGameModal");
          const error = document.createElement("h5");
          error.classList.add("errmsg");
          error.innerText = "This name is already in use. Try another.";
          newGameModal.appendChild(error);
        } else {
          window.localStorage.setItem("name", game.name);
          window.location = `/${game.name}`;
        }
      })
      .catch((err) => {
        console.log(`catch: ${err}`);
      });
  }
};

const joinGame = () => {
  const name = document.getElementById("joinName").value;
  console.log(`name: ${name}`);
  fetch(`/api/v1/games/search/${name}`, { method: "GET" }).then((res) => {
    if (res.status !== 302) {
      const joinGameModal = document.getElementById("joinGameModal");
      const error = document.createElement("h5");
      error.classList.add("errmsg");
      error.innerText = "No games with this name exist.";
      joinGameModal.appendChild(error);
    } else {
      console.log(res.status);
      window.localStorage.setItem("name", name);
      window.location = `/${name}`;
    }
  });
};

const inputs = document.querySelectorAll("input");
// console.log(inputs);
const menuButtons = document.querySelectorAll(".menu-button");

inputs.forEach((input) => {
  input.addEventListener("keydown", clearErr);
});
menuButtons.forEach((button) => {
  button.addEventListener("click", handleModal);
});

document.getElementById("goNew").addEventListener("click", createGame);
document.getElementById("goJoin").addEventListener("click", joinGame);

getWords();
