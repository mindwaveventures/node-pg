const pgClient = require("../pg-config");

async function addToCartController(req, res) {
  try {
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
  } catch (err) {
    console.log("Unknown Error:", err);
    res.status(500).json({ error: "Unknown Error" });
  }
}

module.exports = {
  addToCartController,
};
