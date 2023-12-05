const { models } = require("../config/sequelize-config");
async function addToCartController(req, res) {
  try {
    const addCart = await models.cart.create({
      user_id: req.body.user_id,
      item_id: req.body.item_id,
    });
    return res.json({
      addCart,
    });
  } catch (error) {
    return res.json({ message: error });
  }
}

module.exports = {
  addToCartController,
};
