const pgClient = require("../pg-config");

async function addToCartController(req, res) {
  try {
    const CartqueryText =
      "INSERT INTO carts (item_id,user_id) VALUES ($1,$2) RETURNING  *";

    const cartRes = await pgClient.query(CartqueryText, [
      req.xop.item_id,
      req.xop.user_id,
    ]);
    res.json({
      rows: cartRes.rows,
      count: cartRes.rowCount,
    });
  } catch (err) {
    res.status(500).json({ error: "Unknown Error" });
  }
}

module.exports = {
  addToCartController,
};
