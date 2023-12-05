const { models, Sequelize } = require("../config/sequelize-config");

const overallRatingController = async (req, res) => {
  const pgRes = await pgClient.query(
    "select item_id,AVG(rating) AS overall_rating from ratings GROUP by item_id;"
  );

  res.json({
    rows: pgRes.rows,
    count: pgRes.rowCount,
  });
};

const addRatingController = async (req, res) => {
  try {
    const addRating = await models.rating.create({
      ratingValue: req.xop.ratingValue,
      user_id: req.xop.user_id,
      item_id: req.xop.item_id,
    });
    return res.json({
      addRating,
    });
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
};

module.exports = {
  overallRatingController,
  addRatingController,
};
