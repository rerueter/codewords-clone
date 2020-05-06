console.log("main.js");

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
      if (responseJSON.status !== 201) {
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
};
const joinGame = () => {
  const game = document.getElementById("gamename").value;
  window.location = `/${game}`;
};

const inputs = document.querySelectorAll("input");
console.log(inputs);
const menuButtons = document.querySelectorAll(".menu-button");

inputs.forEach((input) => {
  input.addEventListener("keydown", clearErr);
});
menuButtons.forEach((button) => {
  button.addEventListener("click", handleModal);
});

document.getElementById("goNew").addEventListener("click", createGame);
document.getElementById("newName").addEventListener("click", handleJoin);
