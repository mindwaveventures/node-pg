const { models, Sequelize } = require("../config/sequelize-config");

async function addRatingController(req, res) {
  try {
    const addRating = await models.ratings.create({
      rating: req.xop.rating,
      user_id: req.xop.user_id,
      item_id: req.xop.item_id,
    });
    return res.json({
      addRating,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

const overallRatingController = async (req, res, next) => {
  try {
    const overallRating = await models.ratings.findAll({
      attributes: [
        [Sequelize.fn("AVG", Sequelize.col("ratingValue")), "overall_rating"],
      ],
      group: ["item_id"],
    });

    res.json({ overallRating });
  } catch (error) {
    return next({
      status: 400,
      message: error.message,
    });
  }
};

module.exports = {
  addRatingController,
  overallRatingController,
};
