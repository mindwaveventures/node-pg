const pgClient = require("../pg-config");

async function buyItemController(req, res) {
  try {
    const buyQueryText =
      "INSERT INTO purchases(item_id,user_id,item_price,order_status) VALUES ($1,$2,$3,$4) RETURNING *";
    const buyRes = await pgClient.query(buyQueryText, [
      req.xop.item_id,
      req.xop.user_id,
      req.xop.item_price,
      req.xop.order_status,
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
  } catch (err) {}
}
async function PurchasesListController(req, res) {
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
      queryText += ` ORDER BY items.price ${sortPrice}`;
    }
    //sort by date
    if (req.query.sortDateOrder) {
      const sortOrder = req.query.sortDateOrder === "desc" ? "DESC" : "ASC";
      queryText += ` ORDER BY purchases.date_of_order ${sortOrder}`;
    }

    //filter by price range

    if (req.query.priceRange) {
      const priceRanges = req.query.priceRange.split("-");
      const minPrice = parseFloat(priceRanges[0]);
      const maxPrice = parseFloat(priceRanges[1]);

      queryText += ` AND items.price BETWEEN ${minPrice} AND ${maxPrice}`;
    }

    const listRes = await pgClient.query(queryText, [req.params.user_id]);
    res.json({
      rows: listRes.rows,
      count: listRes.rowCount,
    });
  } catch (err) {
    res.status(500).json({ error: "Unknown Error" });
  }
}

// update to cancel
const updateStatusController = async function (req, res) {
  const queryText =
    "UPDATE purcharse SET order_status=$1 WHERE purchase_id=$2 RETURNING purchase_id, order_status";
  const pgRes = await pgClient.query(queryText, [
    req.body.order_status,
    req.body.purchaseid,
  ]);

  res.json({
    rows: pgRes.rows,
    count: pgRes.rowCount,
  });
};

//cancel
const cancelListController = async (req, res) => {
  try {
    if (!req.query.user_id) {
      return res.status(400).json({ error: "Please provide a user_id" });
    }

    let query =
      "SELECT purcharse.*, items.item_name FROM purcharse JOIN items ON purcharse.item_id = items.item_id WHERE purcharse.order_status = 'Cancelled'";

    if (req.query.user_id) {
      query += ` AND purcharse.user_id = ${req.query.user_id}`;
    }

    if (req.query.search) {
      query += ` AND items.item_name ILIKE '%${req.query.search}%'`;
    }

    if (req.query.sortOrder) {
      const sortOrder =
        req.query.sortOrder.toUpperCase() === "DESC" ? "DESC" : "ASC";
      query += ` ORDER BY items.price ${sortOrder}`;
    }

    if (req.query.priceRange) {
      const priceRanges = req.query.priceRange.split("-");
      const minPrice = parseFloat(priceRanges[0]);
      const maxPrice = parseFloat(priceRanges[1]);

      query += ` AND items.price BETWEEN $1 AND $2`;

      const pgRes = await pgClient.query(query, [minPrice, maxPrice]);
      res.json({
        rows: pgRes.rows,
        count: pgRes.rowCount,
      });
    } else {
      const pgRes = await pgClient.query(query);
      res.json({
        rows: pgRes.rows,
        count: pgRes.rowCount,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  buyItemController,
  PurchasesListController,
  updateStatusController,
  cancelListController,
};
