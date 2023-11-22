const express = require("express");
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config();
const pgClient = require("./pg-config");
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(jsonParser);
app.use(urlencodedParser);

app.get("/", async function (req, res) {
  const pgRes = await pgClient.query("SELECT item_name from items LIMIT $1", [
    req.query.limit || 1,
  ]);

  res.json({
    rows: pgRes.rows,
    count: pgRes.rowCount,
  });
});

app.post("/add-items", async function (req, res) {
  const queryText =
    "INSERT INTO items(item_name,item_content,price,status_of_item) VALUES($1,$2,$3,$4) RETURNING item_id,item_name";
  const pgRes = await pgClient.query(queryText, [
    req.body.item_name,
    req.body.item_content,
    req.body.price,
    req.body.status_of_item,
  ]);

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
