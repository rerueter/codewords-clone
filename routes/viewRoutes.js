const express = require("express");
const router = express.Router();
const path = require("path");

//______________________________________________________ Serve Public
router.use(express.static(path.join(__dirname, "../public")));

//______________________________________________________________ Game
router.get("/:name", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/game.html"));
});

//_____________________________________________________________ Index
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/index.html"));
});

//_____________________________________________________ Export Module
module.exports = router;
