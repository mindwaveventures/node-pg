const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();
const jsonParser = bodyParser.json();
const { errorHandler } = require("./middlewares/errorHandler.middleware");
const { notfound } = require("./middlewares/notfound.middleware");
app.use(jsonParser);

const userRouter = require("./routes/user.router");
const itemRouter = require("./routes/items.route");
const urlencodedParser = bodyParser.urlencoded({ extended: false });

// app.use(jsonParser);
app.use(urlencodedParser);

//routers
app.use("/", userRouter);
app.use("/", itemRouter);

app.use(notfound);
app.use(errorHandler);
require("dotenv").config();
app.use(express.json());

// items routes
app.use(errorHandler);
app.use(notfound);

app.listen(process.env.PORT, process.env.HOST, () => {
  console.log(
    `Server running at http://${process.env.HOST}:${process.env.PORT}/`
  );
});
