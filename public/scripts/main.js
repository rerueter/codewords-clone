console.log("main.js");

const handleModal = (event) => {
  console.log(event.target.id);
  const modal = document.getElementById(`${event.target.id}Modal`);
  modal.classList.toggle("hidden");
};

const createGame = () => {
  const game = document.getElementById("newName").value;
  window.localStorage.setItem("name", game);
  window.location = `/${game}`;
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
// document.getElementById("goNew").addEventListener("click", createGame);
// document.getElementById("joingame").addEventListener("click", handleJoin);
