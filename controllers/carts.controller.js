const { models } = require("../config/sequelize-config");

async function addToCartController(req, res, next) {
  try {
    const addCart = await models.carts.create({
      user_id: req.body.user_id,
      item_id: req.body.item_id,
    });
    return res.json({
      addCart,
    });
  } catch (error) {
    return next({
      status: 400,
      message: error.message,
    });
  }
}

module.exports = {
  addToCartController,
};
