const config = require("../config/config");

const { sequelize, models, Sequelize } = require("../config/sequelize-config");
const items = require("../models/items");
const Op = Sequelize.Op;

const purchasesController = async (req, res) => {
  try {
    const purchase = await models.purchases.create({
      user_id: req.body.user_id,
      item_id: req.body.item_id,
      status: req.body.status,
    });
    const updatedItem = await models.items.decrement("item_count", {
      by: 1,
      where: {
        item_id: req.body.item_id,
      },
    });

    return res.json({
      purchase,
      updatedItem,
    });
  } catch (error) {
    console.log(error);

    return res.send(error.message);
  }
};

const cancelListController = async (req, res) => {
  try {
    if (!req.query.user_id) {
      return res.status(400).json({ error: "Please provide a user_id" });
    }

    let minPrice;
    let maxPrice;
    if (req.query.priceRange) {
      const priceRanges = req.query.priceRange.split("-");
      minPrice = parseFloat(priceRanges[0]);
      maxPrice = parseFloat(priceRanges[1]);
    }

    const cancelList = await models.items.findAll({
      include: [
        {
          model: models.purchases,
          where: { user_id: req.query.user_id },
          where: {
            status: "Cancel",
          },
        },
      ],
      where: {
        [Op.and]: [
          {
            item_name: {
              [Sequelize.Op.iLike]: `%${req.query.search || ""}%`,
            },
          },
          {
            price: { [Sequelize.Op.between]: [minPrice, maxPrice] },
          },
        ],
      },
      order: [
        [
          "price",
          req.query.sortOrder && req.query.sortOrder.toUpperCase() === "DESC"
            ? "DESC"
            : "ASC",
        ],
      ],
    });

    res.json({
      cancelList,
    });
  } catch (error) {
    console.log(error);

    return res.send(error.message);
  }
};

module.exports = { purchasesController, cancelListController };
