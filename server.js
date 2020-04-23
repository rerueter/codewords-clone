const express = require("express");
const app = express;
const PORT = 4000;

app.use("/", (req, res) => {
  res.send("hello world");
});

app.listen(PORT, () => {
  console.log(`server listening at port ${PORT}`);
});
