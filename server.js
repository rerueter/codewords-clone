console.log("*** server reporting for duty ***");

//______________________________________________________ Server Setup
const express = require("express");
const bodyParser = require("body-parser");

//_________________________________________________ Instanced Modules
const app = express();
const routes = require("./routes");

//__________________________________________________ Config Variables
const PORT = process.env.PORT || 4000;

//________________________________________________________ Middleware
app.use(bodyParser.json());

//________________________________________________________ API Routes
app.use("/api/v1/lexicon", routes.lexicon);
app.use("/api/v1/games", routes.game);

//_______________________________________________________ HTML Routes
app.use("/", routes.views);

//______________________________________________________ Start Server
app.listen(PORT, () => {
  console.log(`***listening at port ${PORT}***`);
});
