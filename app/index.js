const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();

const { errorHandler } = require("./middlewares/errorHandler.middleware");
const { notfound } = require("./middlewares/notFound.middleware");

const userRouter = require("./routes/user.router");
const PurchaseRouter = require("./routes/Purchases.router");
const ItemsRouter = require("./routes/items.routes");
const cancelRouter = require("./routes/cancel.router");

// create application/json parser
const jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(jsonParser);
app.use(urlencodedParser);

//routers
app.use("/", userRouter);
app.use("/", PurchaseRouter);
app.use("/", ItemsRouter);
app.use("/", cancelRouter);

app.use(notfound);
app.use(errorHandler);

app.listen(process.env.PORT, process.env.HOST, () => {
  console.log(
    `Server running at http://${process.env.HOST}:${process.env.PORT}/`
  );
});
