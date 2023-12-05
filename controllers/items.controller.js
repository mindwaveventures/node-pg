const { sequelize, models, Sequelize } = require("../config/sequelize-config");
const Op = Sequelize.Op;

const addItemController = async (req, res) => {
  try {
    const itemsCreate = await models.items.create({
      item_name: req.body.item_name,
      item_content: req.body.item_content,
      price: req.body.price,
      item_count: req.body.item_count,
    });
    return res.json({
      itemsCreate,
    });
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
};

module.exports = {
  addItemController,
};
