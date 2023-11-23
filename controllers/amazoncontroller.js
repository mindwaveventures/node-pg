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
module.exports = {
  addRatingController,
};
