const config = require("../config/config");
const { sequelize, models, Sequelize } = require("../config/sequelize-config");
const Op = Sequelize.Op;

const addfavoritescontroller = async (req, res) => {
  try {
    const favouriteCreate = await models.favourites.create({
      user_id: req.body.user_id,
      item_id: req.body.item_id,
    });
    return res.json({
      favouriteCreate,
    });
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
};
module.exports = {
  addfavoritescontroller,
};
