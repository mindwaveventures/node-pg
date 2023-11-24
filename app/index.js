const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();

const { errorHandler } = require("./middlewares/errorHandler.middleware");
const { notfound } = require("./middlewares/notFound.middleware");

const userRouter = require("./routes/user.router");



app.use(jsonParser);
app.use(urlencodedParser);

//routers
app.use("/", userRouter);

app.use(notfound);
app.use(errorHandler);
require("dotenv").config();
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(express.json());
app.use(jsonParser);
app.use(urlencodedParser);
const itemRouter = require("../routes/items.route");


// items routes
app.use("/", itemRouter);
app.use(errorHandler);
app.use(notfound);

app.listen(process.env.PORT, process.env.HOST, () => {
  console.log(
    `Server running at http://${process.env.HOST}:${process.env.PORT}/`
  );
});
