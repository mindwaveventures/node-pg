const express = require("express");
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config();

const pgClient = require("./pg-config");

// create application/json parser
const jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(jsonParser);
app.use(urlencodedParser);

app.post("/save-user", async function (req, res) {
  const queryText = "INSERT INTO users(name) VALUES($1) RETURNING userid,name";
  const pgRes = await pgClient.query(queryText, [req.body.name]);

  const postQueryText =
    "INSERT INTO posts(postcontent,userid) VALUES($1,$2) RETURNING postid";
  const postPgRes = await pgClient.query(postQueryText, [
    req.body.postcontent,
    pgRes.rows[0].userid,
  ]);

  res.json({
    rows: pgRes.rows,
    count: pgRes.rowCount,
    postInsert: postPgRes.rows,
  });
});

app.patch("/update-user", async function (req, res) {
  const queryText =
    "UPDATE users set name=$1 where userid=$2 RETURNING userid,name";
  const pgRes = await pgClient.query(queryText, [
    req.body.name,
    req.body.userid,
  ]);

  res.json({
    rows: pgRes.rows,
    count: pgRes.rowCount,
  });
});

app.get("/item", async function (req, res) {
  const pgRes = await pgClient.query("SELECT * from items LIMIT $1", [
    req.query.limit || 1,
  ]);

  res.json({
    rows: pgRes.rows,
    count: pgRes.rowCount,
  });
});

app.delete("/remove", async function (req, res) {
  const pgRes = await pgClient.query(
    "DELETE from users where userid=$1 RETURNING userid",
    [req.query.userid]
  );

  res.json({
    rows: pgRes.rows,
    count: pgRes.rowCount,
  });
});

app.listen(process.env.PORT, process.env.HOST, () => {
  console.log(
    `Server running at http://${process.env.HOST}:${process.env.PORT}/`
  );
});
