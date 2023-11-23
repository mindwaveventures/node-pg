const express = require("express");
const shoppingRouter = require("./routes/shoppingroutes");
// require("dotenv").config();
//const pgClient = require("./pg-config");
const bodyParser = require("body-parser");

const { notfound } = require("./middlewares/notfound.middleware");

const { errorHandler } = require("./middlewares/errorHandler.middleware");

const app = express();

const jsonParser = bodyParser.json();

const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(jsonParser);
app.use(urlencodedParser);

app.use("/", shoppingRouter);
// app.post("/addRating", async function (req, res) {
//   const queryText =
//     "INSERT INTO rating(item_id,user_id,ratingvalue) VALUES($1,$2,$3) RETURNING item_id,user_id,ratingvalue";
//   const pgRes = await pgClient.query(queryText, [
//     req.body.item_id,
//     req.body.user_id,
//     req.body.ratingValue,
//   ]);

//   res.json({
//     rows: pgRes.rows,
//     count: pgRes.rowCount,
//   });
// });
app.use(notfound);
app.use(errorHandler);
app.listen(process.env.PORT, process.env.HOST, () => {
  console.log(
    `Server running at http://${process.env.HOST}:${process.env.PORT}/`
  );
});

//-----Example--------------
// app.post("/save-user", async function (req, res) {
//   const queryText = "INSERT INTO users(name) VALUES($1) RETURNING userid,name";
//   const pgRes = await pgClient.query(queryText, [req.body.name]);

//   const postQueryText =
//     "INSERT INTO posts(postcontent,userid) VALUES($1,$2) RETURNING postid";
//   const postPgRes = await pgClient.query(postQueryText, [
//     req.body.postcontent,
//     pgRes.rows[0].userid,
//   ]);

//   res.json({
//     rows: pgRes.rows,
//     count: pgRes.rowCount,
//     postInsert: postPgRes.rows,
//   });
// });

// app.patch("/update-user", async function (req, res) {
//   const queryText =
//     "UPDATE users set name=$1 where userid=$2 RETURNING userid,name";
//   const pgRes = await pgClient.query(queryText, [
//     req.body.name,
//     req.body.userid,
//   ]);

//   res.json({
//     rows: pgRes.rows,
//     count: pgRes.rowCount,
//   });
// });

// app.get("/", async function (req, res) {
//   const pgRes = await pgClient.query("SELECT user_name from users LIMIT $1", [
//     req.query.limit || 1,
//   ]);

//   res.json({
//     rows: pgRes.rows,
//     count: pgRes.rowCount,
//   });
// });

// app.delete("/remove", async function (req, res) {
//   const pgRes = await pgClient.query(
//     "DELETE from users where userid=$1 RETURNING userid",
//     [req.query.userid]
//   );

//   res.json({
//     rows: pgRes.rows,
//     count: pgRes.rowCount,
//   });
// });
