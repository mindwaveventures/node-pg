const pgClient = require("../pg-config");

// add items
const additemscontroller = async (req, res) => {
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
};
// update item content
const updateitemController = async (req, res) => {
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
};
// get all items
const getallitemcontroller = async (req, res) => {
  const pgRes = await pgClient.query("SELECT * from items");
  res.json({
    rows: pgRes.rows,
  });
};
// get single item by id
const getbysingleitemcontroller = async (req, res) => {
  const itemId = req.params.itemId;
  const pgRes = await pgClient.query("SELECT * FROM items WHERE item_id = $1", [
    itemId,
  ]);
  res.json({
    rows: pgRes.rows,
    count: pgRes.rowCount,
  });
};
// favourites add
const addfavoritescontroller = async (req, res) => {
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
};
// sort by price ascending
const sortPriceAscendingcontroller = async (req, res) => {
  const pgRes = await pgClient.query("SELECT * from items ORDER BY price ASC");
  res.json({
    rows: pgRes.rows,
  });
};
// Sort price in descending order
const sortPriceDecendingcontroller = async (req, res) => {
  const pgRes = await pgClient.query("SELECT * from items ORDER BY price DESC");
  res.json({
    rows: pgRes.rows,
  });
};
// sort  item name ascending order
const sortItemnameAScensingcontroller = async (req, res) => {
  const pgRes = await pgClient.query(
    "SELECT * from items ORDER BY item_name ASC"
  );
  res.json({
    rows: pgRes.rows,
  });
};
//Descending by item name
const sortItemnameDecensingcontroller = async (req, res) => {
  const pgRes = await pgClient.query(
    "SELECT * from items ORDER BY item_name DESC"
  );
  res.json({
    rows: pgRes.rows,
  });
};
// filter by price
const filterItemPricecontroller = async (req, res) => {
  if (req.query.priceRange) {
    const priceRanges = req.query.priceRange.split("-");
    const minPrice = parseFloat(priceRanges[0]);
    const maxPrice = parseFloat(priceRanges[1]);
    query = `SELECT * FROM items  WHERE items.price BETWEEN ${minPrice} AND ${maxPrice}`;
  }
  const pgRes = await pgClient.query(query);
  res.json({
    rows: pgRes.rows,
    count: pgRes.rowCount,
  });
};

//  search by item name
const SearchItemNamecontroller = async (req, res) => {
  if (req.query.search) {
    query = `  SELECT * FROM items WHERE item_name ILIKE '%${req.query.search}%'`;
  }
  const pgRes = await pgClient.query(query);
  res.json({
    rows: pgRes.rows,
    count: pgRes.rowCount,
  });
};
module.exports = {
  additemscontroller,
  updateitemController,
  getbysingleitemcontroller,
  getallitemcontroller,
  addfavoritescontroller,
  sortPriceAscendingcontroller,
  sortPriceDecendingcontroller,
  sortItemnameAScensingcontroller,
  sortItemnameDecensingcontroller,
  filterItemPricecontroller,
  SearchItemNamecontroller,
};
