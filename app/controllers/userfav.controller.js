const pgClient = require("../pg-config");

// To add favourite
const addfavouritecontroller = async (req, res, next) => {
  const queryText =
    "INSERT INTO favourites(item_id,user_id) VALUES($1,$2) RETURNING *";
  const pgRes = await pgClient.query(queryText, [
    req.body.item_id,
    req.body.user_id,
  ]);
  res.json({
    rows: pgRes.rows,
    count: pgRes.rowCount,
  });
};

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
      query += ` ORDER BY items.price ${sortOrder}`;
    }

    if (req.query.priceRange) {
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

module.exports = {
  addfavouritecontroller,
  getFavController,
};
