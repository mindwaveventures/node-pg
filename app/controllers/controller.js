const pgClient = require("../pg-config");

const updateStatusController = async function (req, res) {
  const queryText =
    "UPDATE purcharse SET status=$1 WHERE purchase_id=$2 RETURNING purchase_id, status";
  const pgRes = await pgClient.query(queryText, [
    req.body.status,
    req.body.purchaseid,
  ]);

  res.json({
    rows: pgRes.rows,
    count: pgRes.rowCount,
  });
};

const getFavController = async (req, res) => {
  try {
    let query;

    //http://localhost:5001/fav?user_id=2

    if (req.query.user_id) {
      query =
        "SELECT items.* FROM items JOIN favourites ON items.item_id = favourites.item_id";
      query += ` WHERE favourites.user_id = ${req.query.user_id}`;
    }

    //http://localhost:5000/fav?user_id=1&search=al

    if (req.query.search) {
      query =
        "SELECT items.* FROM items JOIN favourites ON items.item_id = favourites.item_id";
      query += ` AND items.item_name ILIKE '%${req.query.search}%'`;
    }

    // Adding sorting

    if (req.query.sortOrder) {
      query =
        "SELECT items.* FROM items JOIN favourites ON items.item_id = favourites.item_id";
      const sortOrder = req.query.sortOrder === "desc" ? "DESC" : "ASC";
      query += ` ORDER BY ${sortOrder}`;
    }

    // Adding sorting by price range
    //http://localhost:5001/fav?priceRange=0-500

    if (req.query.priceRange) {
      query =
        "SELECT items.* FROM items JOIN favourites ON items.item_id = favourites.item_id";
      const priceRanges = req.query.priceRange.split("-");
      const minPrice = parseFloat(priceRanges[0]);
      const maxPrice = parseFloat(priceRanges[1]);

      query += ` AND items.price BETWEEN ${minPrice} AND ${maxPrice}`;
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
    "select item_id,AVG(rating) AS overall_rating from ratings GROUP by item_id;"
  );

  res.json({
    rows: pgRes.rows,
    count: pgRes.rowCount,
  });
};

const cancelListController = async (req, res) => {
  try {
    let query = "SELECT * FROM purcharse WHERE status = 'Cancelled'";

    if (req.query.priceRange) {
      const priceRanges = req.query.priceRange.split("-");
      const minPrice = parseFloat(priceRanges[0]);
      const maxPrice = parseFloat(priceRanges[1]);

      query += " AND purcharse.price BETWEEN $1 AND $2";

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
