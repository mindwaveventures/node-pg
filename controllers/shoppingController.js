const pgClient = require("../pg-config");

async function addRatingController(req, res) {
  const queryText =
    "INSERT INTO rating(item_id,user_id,ratingvalue) VALUES($1,$2,$3) RETURNING item_id,user_id,ratingvalue";
  console.log(req.body.item_id, req.body.user_id, req.xop.ratingValue);
  const pgRes = await pgClient.query(queryText, [
    req.body.item_id,
    req.body.user_id,
    req.xop.ratingValue,
  ]);
  res.json({
    rows: pgRes.rows,
    count: pgRes.rowCount,
  });
}
async function addToCartController(req, res) {
  const CartqueryText =
    "INSERT INTO cart (item_id,item_name,user_id,item_price) VALUES ($1,$2,$3,$4) RETURNING  *";
  console.log(
    req.xop.item_id,
    req.xop.item_name,
    req.xop.user_id,
    req.xop.item_price
  );
  const cartRes = await pgClient.query(CartqueryText, [
    req.xop.item_id,
    req.xop.item_name,
    req.xop.user_id,
    req.xop.item_price,
  ]);
  res.json({
    rows: cartRes.rows,
    count: cartRes.rowCount,
  });
}

async function buyItemController(req, res) {
  const buyQueryText =
    "INSERT INTO purchases(item_id,user_id,date_of_order,item_price,status) VALUES ($1,$2,$3,$4,$5) RETURNING *";
  const buyRes = await pgClient.query(buyQueryText, [
    req.body.item_id,
    req.body.user_id,
    req.body.date_of_order,
    req.body.item_price,
    req.body.status,
  ]);
  const itemCountQueryText =
    "UPDATE items SET item_count = item_count-1 WHERE item_id= $1 RETURNING *";
  const itemCountRes = await pgClient.query(itemCountQueryText, [
    buyRes.rows[0].item_id,
  ]);
  res.json({
    rows: buyRes.rows,
    buyResCount: buyRes.rowCount,
    itemUpdate: itemCountRes.rows,
    itemUpdateCount: itemCountRes.rowCount,
  });
}
module.exports = {
  addRatingController,
  addToCartController,
  buyItemController,
};
