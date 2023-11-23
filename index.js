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
app.use(express.json());

// To insert a data in add-item

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
// to add favourites
app.post("/favourites", async function (req, res) {
  const queryText =
    "INSERT INTO favourites(item_id,user_id) VALUES($1,$2) RETURNING item_id,user_id";
  const pgRes = await pgClient.query(queryText, [
    req.body.item_id,
    req.body.user_id,
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
// To show list of items
app.get("/items", async function (req, res) {
  const pgRes = await pgClient.query("SELECT * from items ");
  res.json({
    rows: pgRes.rows,
  });
});
// Sort price in ascending order
app.get("/sort/asc-by-price", async function (req, res) {
  const pgRes = await pgClient.query("SELECT * from items ORDER BY price ASC");
  res.json({
    rows: pgRes.rows,
  });
});
// Sort price in descending order
app.get("/sort/desc-by-price", async function (req, res) {
  const pgRes = await pgClient.query("SELECT * from items ORDER BY price DESC");
  res.json({
    rows: pgRes.rows,
  });
});

//ascending by item name
app.get("/sort/asc-by-itemname", async function (req, res) {
  const pgRes = await pgClient.query(
    "SELECT * from items ORDER BY item_name ASC"
  );
  res.json({
    rows: pgRes.rows,
  });
});

//Descending by item name
app.get("/sort/desc-by-itemname", async function (req, res) {
  const pgRes = await pgClient.query(
    "SELECT * from items ORDER BY item_name DESC"
  );
  res.json({
    rows: pgRes.rows,
  });
});

// to search
app.get("/items", (req, res) => {
  let search = req.query.search;
  const pgRes = filteredtitle(search);
  return res.json({
    rows: pgRes.rows,
  });
});
function filteredtitle(searchText) {
  const searchTextLow = searchText.toLowerCase();
  const result = items.filter((m) =>
    m.title.toLowerCase().includes(searchTextLow)
  );
  return result.filter((res) => res.item_name);
}

// to filter the price range
app.get("/filter", async function (req, res) {
  try {
    if (req.query.priceRange) {
      const priceRanges = req.query.priceRange.split("-");
      const minPrice = parseFloat(priceRanges[0]);
      const maxPrice = parseFloat(priceRanges[1]);

      query = ` SELECT * FROM items WHERE items.price BETWEEN ${minPrice} AND ${maxPrice}`;
    }

    const pgRes = await pgClient.query(query);

    res.json({
      rows: pgRes.rows,
      count: pgRes.rowCount,
    });
  } catch (error) {
    console.error("Error fetching items:", error);
  }
});

// To search
app.get("/search", async function (req, res) {
  try {
    if (req.query.search) {
      query = `  SELECT * FROM items WHERE item_name ILIKE '%${req.query.search}%'`;
    }

    const pgRes = await pgClient.query(query);

    res.json({
      rows: pgRes.rows,
      count: pgRes.rowCount,
    });
  } catch (error) {
    console.error("Error fetching items:", error);
  }
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
