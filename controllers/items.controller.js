const pgClient = require("../pg-config");

// To add a item
const additemcontroller = async (req, res) => {
  const pgRes = await pgClient.query("SELECT name from users LIMIT $1", [
    req.query.limit || 1,
  ]);

  res.json({
    rows: pgRes.rows,
    count: pgRes.rowCount,
  });
};

// To update a item
const updateitemcontroller = async (req, res) => {
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

//To get a single item
const addsingleitem = async (req, res) => {
  const itemId = req.params.itemId;

  const pgRes = await pgClient.query("SELECT * FROM items WHERE item_id = $1", [
    itemId,
  ]);

  res.json({
    rows: pgRes.rows,
    count: pgRes.rowCount,
  });
};

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

module.export = {
  additemcontroller,
  updateitemcontroller,
  addsingleitem,
};
