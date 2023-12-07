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

    let sortPrice;
    let whereQuery = {};

    if (req.query.search) {
      whereQuery.item_name = {
        [Op.iLike]: `%${req.query.search}%`,
      };
    }

    if (req.query.sortPrice) {
      sortPrice = req.query.sortPrice;
    }

    if (req.query.priceRange) {
      const priceRanges = req.query.priceRange.split("-");
      const minPrice = parseFloat(priceRanges[0]);
      const maxPrice = parseFloat(priceRanges[1]);
      whereQuery.price = {
        [Op.between]: [minPrice, maxPrice],
      };
    }
    const cancelList = await models.purchases.findAll({
      attributes: ["status", "purchases_id"],
      where: {
        user_id: req.query.user_id,
        status: "Cancel",
      },
      order: [[models.items, "price", sortPrice ? sortPrice : "DESC"]],
      include: [
        {
          model: models.items,
          where: whereQuery,
          attributes: ["item_name", "item_content", "price"],
        },
      ],
      logging: true,
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
