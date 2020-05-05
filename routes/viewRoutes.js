const express = require("express");
const router = express.Router();
const path = require("path");

//______________________________________________________ Serve Public
router.use(express.static(path.join(__dirname, "../public")));

//__________________________________________________________ GET Game
router.get("/:name", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/game2.html"));
});

//__________________________________________________________ GET Game
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/game.html"));
});

//_____________________________________________________ Export Module
module.exports = router;
