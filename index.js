const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const config = require("./config/config");
// const pgClient = require('./pg-config');
const { models, Sequelize } = require("./config/sequelize-config");
const Op = Sequelize.Op;

// create application/json parser
const jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const { notfound } = require("./middlewares/notFound.middleware");
const { errorHandler } = require("./middlewares/errorHandler.middleware");

const userRouter = require("./routes/user.routes");
const itemRouter = require("./routes/items.router");
const userData = require("./routes/usersData.router");

app.use(jsonParser);
app.use(urlencodedParser);

app.use("/", userRouter);
app.use("/items", itemRouter);
app.use("/u", userData);

app.use(notfound);
app.use(errorHandler);
app.listen(config.port, config.host, () => {
  console.log(`Server running at http://${config.host}:${config.port}/`);
});
