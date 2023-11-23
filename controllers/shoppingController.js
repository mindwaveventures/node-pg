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
module.exports = {
  addRatingController,
  addToCartController,
};
