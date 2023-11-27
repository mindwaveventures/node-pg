const pgClient = require("../pg-config");

async function buyItemController(req, res) {
  try {
    const buyQueryText =
      "INSERT INTO purchases(item_id,user_id,item_price,status) VALUES ($1,$2,$3,$4) RETURNING *";
    const buyRes = await pgClient.query(buyQueryText, [
      req.xop.item_id,
      req.xop.user_id,
      req.xop.item_price,
      req.xop.status,
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
  } catch (err) {
    console.log("Unknown Error:", err);
    res.status(500).json({ error: "Unknown Error" });
  }
}
async function PurchaseslistController(req, res) {
  let queryText = `SELECT purchases.*,items.item_name FROM purchases JOIN items ON purchases.item_id = items.item_id WHERE purchases.user_id = $1`;
  try {
    //search by name
    if (req.query.search) {
      queryText += ` AND items.item_name ILIKE '%${req.query.search}%' ORDER BY items.item_name `;
    }

    //sort by price
    if (req.query.sortPrice) {
      //const sortOrder = req.query.sortOrder === "desc" ? "DESC" : "ASC";
      const sortPrice = req.query.sortPrice;
      queryText += ` ORDER BY purchases.item_price ${sortPrice}`;
      console.log(sortPrice);
      console.log(queryText);
    }
    //sort by date
    if (req.query.sortDateOrder) {
      const sortOrder = req.query.sortDateOrder === "desc" ? "DESC" : "ASC";
      queryText += ` ORDER BY purchases.date_of_order ${sortOrder}`;
      console.log(sortOrder);
      console.log(queryText);
    }

    //filter by price range

    if (req.query.priceRange) {
      const priceRanges = req.query.priceRange.split("-");
      const minPrice = parseFloat(priceRanges[0]);
      const maxPrice = parseFloat(priceRanges[1]);

      queryText += ` AND purchases.item_price BETWEEN ${minPrice} AND ${maxPrice} ORDER BY purchases.item_price`;
    }

    const listRes = await pgClient.query(queryText, [req.params.user_id]);
    res.json({
      rows: listRes.rows,
      count: listRes.rowCount,
    });
  } catch (err) {
    console.log("Unknown Error:", err);
    res.status(500).json({ error: "Unknown Error" });
  }
}
module.exports = {
  buyItemController,
  PurchaseslistController,
};
