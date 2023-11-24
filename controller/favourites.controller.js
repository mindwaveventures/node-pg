const pgClient = require("../pg-config");

// To add favourite
const addfavouritecontroller = async (req, res) => {
  const queryText =
    "INSERT INTO favourites(item_id,user_id) VALUES($1,$2) RETURNING item_id,user_id";
  const pgRes = await pgClient.query(queryText, [
    req.body.item_id,
    req.body.user_id,
  ]);
  res.json({
    rows: pgRes.rows,
    count: pgRes.rowCount,
  });
};

module.exports = {
  addfavouritecontroller,
};
