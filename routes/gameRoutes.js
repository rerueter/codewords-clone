const express = require("express");
const router = express.Router();
const DB = require("../models");

//_____________________________________________________________ Index
router.get("/", async (req, res) => {
  try {
    const foundGames = await DB.Game.find({});
    const resObject = {
      status: 200,
      data: foundGames,
      reqAt: new Date().toLocaleString(),
    };
    res.status(200).json(resObject);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ msg: "game index failure", err: err });
  }
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
    return res.status(400).json({ msg: "something went wrong", err: err });
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
    return res.status(400).json({ msg: "something went wrong", err: err });
  }
});

//____________________________________________________________ Update
router.put("/:id", async (req, res) => {
  try {
    let foundGame = await DB.Game.findById(req.params.id);
    foundGame.cards = req.body.cards;
    foundGame.turn = req.body.turn;
    foundGame.scoreA = req.body.scoreA;
    foundGame.scoreB = req.body.scoreB;
    foundGame.save();
    const resObject = {
      status: 200,
      data: foundGame,
      reqAt: new Date().toLocaleString(),
    };
    res.status(200).json(resObject);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "update failure", err: err });
  }
});

//____________________________________________________________ Export
module.exports = router;