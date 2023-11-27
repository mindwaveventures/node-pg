const pgClient = require("../pg-config");

async function addRatingController(req, res) {
  try {
    const queryText =
      "INSERT INTO rating(item_id,user_id,ratingvalue) VALUES($1,$2,$3) RETURNING item_id,user_id,ratingvalue";
    console.log(req.body.item_id, req.body.user_id, req.body.ratingValue);
    const pgRes = await pgClient.query(queryText, [
      req.body.item_id,
      req.body.user_id,
      req.body.ratingValue,
    ]);
    res.json({
      rows: pgRes.rows,
      count: pgRes.rowCount,
    });
  } catch (err) {
    console.log("Unknown Error:", err);
    res.status(500).json({ error: "Unknown Error" });
  }
}
const overallRatingController = async (req, res) => {
  const pgRes = await pgClient.query(
    "select item_id,AVG(ratingvalue) AS overall_rating from rating GROUP by item_id;"
  );

  res.json({
    rows: pgRes.rows,
    count: pgRes.rowCount,
  });
};

async function addToCartController(req, res) {
  try {
    const CartqueryText =
      "INSERT INTO cart (item_id,item_name,user_id,item_price) VALUES ($1,$2,$3,$4) RETURNING  *";

    const cartRes = await pgClient.query(CartqueryText, [
      req.body.item_id,
      req.body.item_name,
      req.body.user_id,
      req.body.item_price,
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

async function buyItemController(req, res) {
  try {
    const buyQueryText =
      "INSERT INTO purchases(item_id,user_id,item_price,status) VALUES ($1,$2,$3,$4) RETURNING *";
    const buyRes = await pgClient.query(buyQueryText, [
      req.body.item_id,
      req.body.user_id,
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
  } catch (err) {
    console.log("Unknown Error:", err);
    res.status(500).json({ error: "Unknown Error" });
  }
}
async function listController(req, res) {
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

      queryText += ` AND purchases.item_price BETWEEN ${minPrice} AND ${maxPrice}`;
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
  addRatingController,
  overallRatingController,
  addToCartController,
  buyItemController,
  listController,
  overallRatingController,
};
