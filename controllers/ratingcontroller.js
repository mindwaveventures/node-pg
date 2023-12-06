const { models, Sequelize } = require("../config/sequelize-config");

const overallRatingController = async (req, res) => {
  const ratings = await models.rating.findAndCountAll({
    attributes: [
      [Sequelize.fn("AVG", Sequelize.col("ratingValue")), "overall_rating"],
    ],
    group: ["item_id"],
  });

  res.json({
    ratings,
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
