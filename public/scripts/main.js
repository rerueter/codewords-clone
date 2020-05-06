console.log("main.js");

const handleModal = (event) => {
  console.log(event.target.id);
  const modal = document.getElementById(`${event.target.id}Modal`);
  modal.classList.toggle("hidden");
};

const createGame = () => {
  const game = {};
  game.name = document.getElementById("newName").value;
  console.log(game);
  fetch("/api/v1/games", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(game),
  })
    .then((response) => response.json())
    .then((responseJSON) => {
      console.log(responseJSON);
    });

  // window.localStorage.setItem("name", game.name);
  // window.location = `/${game.name}`;
};
const joinGame = () => {
  const game = document.getElementById("gamename").value;
  window.location = `/${game}`;
};

const menuButtons = document.querySelectorAll(".menu-button");
console.log(menuButtons);
menuButtons.forEach((button) => {
  button.addEventListener("click", handleModal);
});

document.getElementById("goNew").addEventListener("click", createGame);
// document.getElementById("joingame").addEventListener("click", handleJoin);
