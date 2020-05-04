const express = require("express");
const router = express.Router();
const DB = require("../models");

//_____________________________________________________________ Index
router.get("/", (req, res) => {
  DB.Game.find({}, (err, foundGames) => {
    if (err) {
      return res.status(400).json({ msg: "something went wrong", err: err });
    }
    res.status(200).json({ msg: "index successful", foundGames });
  });
});

//______________________________________________________________ Show
router.get("/:id", async (req, res) => {
  try {
    const foundGame = await DB.Game.findById(req.params.id);
    const responseObject = {
      status: 200,
      data: foundGame,
      reqAt: new Date().toLocaleString(),
    };
    res.status(200).json(responseObject);
  } catch (err) {
    return res.status(400).json({ msg: "something went wrong", err });
  }
});

//____________________________________________________________ Create
router.post("/", (req, res) => {
  try {
    const createdGame = DB.Game.create(req.body);
    const responseObject = {
      status: 200,
      data: createdGame,
      reqAt: new Date().toLocaleString(),
    };
    res.status(200).json(responseObject);
  } catch (err) {
    return res.status(400).json({ msg: "something went wrong", err });
  }
});

module.exports = router;
