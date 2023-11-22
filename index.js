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

// To insert a data in add-item
app.post("/add-item", async function (req, res) {
  const queryText =
    "INSERT INTO items(item_name,item_content,price,status_of_item) VALUES($1,$2,$3,$4) RETURNING item_id,item_name";
  const pgRes = await pgClient.query(queryText, [
    req.body.item_name,
    req.body.item_content,
    req.body.price,
    req.body.status_of_item,
  ]);

  // const postQueryText = 'INSERT INTO posts(postcontent,userid) VALUES($1,$2) RETURNING postid';
  // const postPgRes = await pgClient.query(postQueryText, [req.body.postcontent, pgRes.rows[0].userid]);

  res.json({
    rows: pgRes.rows,
    count: pgRes.rowCount,
    // postInsert: postPgRes.rows,
  });
});

// To update data in update-content
app.patch("/update-item-content", async function (req, res) {
  const queryText =
    "UPDATE items set item_content=$1 where item_id=$2 RETURNING item_content,item_id";
  const pgRes = await pgClient.query(queryText, [
    req.body.item_content,
    req.body.item_id,
  ]);

  res.json({
    rows: pgRes.rows,
    count: pgRes.rowCount,
  });
});

app.get("/", async function (req, res) {
  const pgRes = await pgClient.query("SELECT name from users LIMIT $1", [
    req.query.limit || 1,
  ]);

  res.json({
    rows: pgRes.rows,
    count: pgRes.rowCount,
  });
});

// To view single item
app.get("/items/:itemId", async function (req, res) {
  const itemId = req.params.itemId;

  const pgRes = await pgClient.query("SELECT * FROM items WHERE item_id = $1", [
    itemId,
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
