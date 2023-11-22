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
module.exports = {
  additemscontroller,
};
