const express = require("express");
const router = express.Router();
const DB = require("../models");

//_____________________________________________________________ Index
router.get("/", async (req, res) => {
  try {
    const foundLexicons = await DB.Lexicon.find({});
    const resObject = {
      status: 200,
      data: foundLexicons,
      reqAt: new Date().toLocaleString(),
    };
    res.status(200).json(resObject);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ msg: "lexicon index failure", err });
  }
});

//______________________________________________________________ Show
router.get("/:id", async (req, res) => {
  try {
    const foundLexicon = await DB.Lexicon.findById(req.params.id);
    const resObject = {
      data: foundLexicon.words,
      reqAt: new Date().toLocaleString(),
    };
    res.status(200).json(resObject);
  } catch (err) {
    return res.status(400).json({ msg: "lexicon show failure", err: err });
  }
});

//____________________________________________________________ Create
router.post("/", async (req, res) => {
  try {
    const createdLexicon = await DB.Lexicon.create(req.body);
    const resObject = {
      data: createdLexicon,
    };
    res.status(200).json(resObject);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ msg: "lexicon create failure", err: err });
  }
});

//____________________________________________________________ Export
module.exports = router;
