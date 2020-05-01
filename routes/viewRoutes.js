const express = require("express");
const router = express.Router();
const path = require("path");

//______________________________________________________ Serve Public
router.use(express.static(path.join(__dirname, "../public")));

//_______________________________________________________ GET Landing
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/landing.html"));
});

//_____________________________________________________ Export Module
module.exports = router;
