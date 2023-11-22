const express = require("express");
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config();
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(express.json);
app.use(jsonParser);
app.use(urlencodedParser);
const itemRouter = require("./routes/items.route");

// items routes
app.use("/", itemRouter);

app.listen(process.env.PORT, process.env.HOST, () => {
  console.log(
    `Server running at http://${process.env.HOST}:${process.env.PORT}/`
  );
});
