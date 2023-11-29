const config = require("../config/config");
const { sequelize, models, Sequelize } = require("../config/sequelize-config");

const addRatingController = async (req, res) => {
  try {
    const addRating = await models.rating.create({
      ratingValue: req.body.ratingValue,
      user_id: req.body.user_id,
      item_id: req.body.item_id,
    });
    return res.json({
      addRating,
    });
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
};
module.exports = { addRatingController };
