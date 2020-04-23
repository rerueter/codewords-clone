console.log("*** baby server reporting for duty ***");

//______________________________________________________ Server Setup
const express = require("express");
const bParser = require("body-parser");

//_________________________________________________ Instanced Modules
const app = express();

//___________________________________________________ Config Variabls

const PORT = process.env.PORT || 4000;

app.use("/", (req, res) => {
  res.send("hello world");
});

app.listen(PORT, () => {
  console.log(`***listening at port ${PORT}***`);
});
