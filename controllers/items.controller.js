const pgClient = require("../pg-config");
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

const getbysingleitemcontroller = async (req, res) => {
  const itemId = req.params.item_id;
  const pgRes = await pgClient.query("SELECT * FROM items WHERE item_id = $1", [
    itemId,
  ]);
  res.json({
    rows: pgRes.rows,
    count: pgRes.rowCount,
  });
};

module.exports = {
  additemscontroller,
  updateitemController,
  getbysingleitemcontroller,
};
