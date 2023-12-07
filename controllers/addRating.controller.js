const config = require("../config/config");
const { sequelize, models, Sequelize } = require("../config/sequelize-config");

const addRatingController = async (req, res) => {
  try {
    const addRating = await models.rating.create({
      user_id: req.body.user_id,
      item_id: req.body.item_id,
      rating: req.body.rating,
    });
    return res.json({
      addRating,
    });
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
};
const overallRatingController = async (req, res) => {
  const ratings = await models.rating.findAndCountAll({
    attributes: [
      [Sequelize.fn("AVG", Sequelize.col("rating")), "overall_rating"],
    ],
    group: ["item_id"],
  });

  res.json({
    ratings,
  });
};
module.exports = { addRatingController, overallRatingController };
