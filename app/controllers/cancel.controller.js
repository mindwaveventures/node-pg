const pgClient = require("../pg-config");

// update to cancel
const updateStatusController = async function (req, res) {
  const queryText =
    "UPDATE purchases SET status=$1 WHERE purchase_id=$2 RETURNING purchase_id, status";
  const pgRes = await pgClient.query(queryText, [
    req.body.status,
    req.body.purchase_id,
  ]);

  res.json({
    rows: pgRes.rows,
    count: pgRes.rowCount,
  });
};

// fav
const getFavController = async (req, res) => {
  try {
    if (!req.query.user_id) {
      return res.status(400).json({ error: "Please provide a user_id" });
    }

    let query =
      "SELECT items.* FROM items JOIN favourites ON items.item_id = favourites.item_id";

    if (req.query.user_id) {
      query += ` WHERE favourites.user_id = ${req.query.user_id}`;
    }

    if (req.query.search) {
      query += ` AND items.item_name ILIKE '%${req.query.search}%'`;
    }

    if (req.query.sortOrder) {
      const sortOrder =
        req.query.sortOrder.toUpperCase() === "DESC" ? "DESC" : "ASC";
      query += ` ORDER BY items.item_price ${sortOrder}`;
    }

    if (req.query.priceRange) {
      const priceRanges = req.query.priceRange.split("-");
      const minPrice = parseFloat(priceRanges[0]);
      const maxPrice = parseFloat(priceRanges[1]);

      query += ` AND items.item_price BETWEEN ${minPrice} AND ${maxPrice}`;
    }

    const pgRes = await pgClient.query(query);

    res.json({
      rows: pgRes.rows,
      count: pgRes.rowCount,
    });
  } catch (error) {
    console.error("Error fetching items:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const overallRatingController = async (req, res) => {
  const pgRes = await pgClient.query(
    "select item_id,AVG(ratingValue) AS overall_rating from rating GROUP by item_id;"
  );

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
      "SELECT purchases.*, items.item_name FROM purchases JOIN items ON purchases.item_id = items.item_id WHERE purchases.status = 'Cancelled'";

    if (req.query.user_id) {
      query += ` AND purchases.user_id = ${req.query.user_id}`;
    }

    if (req.query.search) {
      query += ` AND items.item_name ILIKE '%${req.query.search}%'`;
    }

    if (req.query.sortOrder) {
      const sortOrder =
        req.query.sortOrder.toUpperCase() === "DESC" ? "DESC" : "ASC";
      console.log;
      query += ` ORDER BY purchases.item_price ${sortOrder}`;
    }

    if (req.query.priceRange) {
      const priceRanges = req.query.priceRange.split("-");
      const minPrice = parseFloat(priceRanges[0]);
      const maxPrice = parseFloat(priceRanges[1]);

      query += ` AND purchases.item_price BETWEEN $1 AND $2`;

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
  updateStatusController,
  getFavController,
  overallRatingController,
  cancelListController,
};
