const config = require("../config/config");
const { sequelize, models, Sequelize } = require("../config/sequelize-config");
const items = require("../models/items");
const Op = Sequelize.Op;

const purchasesController = async (req, res) => {
  //   const t = await models.sequelize.transaction();
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
    return res.send(error);
  }
};

const listController = async (req, res) => {
  try {
    let sortPrice;
    let whereQuery = {};
    let orderQuery = [];

    //search by item_name
    if (req.query.search) {
      console.log("search");
      whereQuery.item_name = {
        [Op.iLike]: `%${req.query.search}%`,
      };
    }
    // sort by price
    if (req.query.sortPrice) {
      sortPrice = req.query.sortPrice;
      console.log("sortPrice", sortPrice);
      orderQuery.push(["price", sortPrice]);
    }
    // filter price
    if (req.query.priceRange) {
      const priceRanges = req.query.priceRange.split("-");
      const minPrice = parseFloat(priceRanges[0]);
      const maxPrice = parseFloat(priceRanges[1]);
      whereQuery.item_price = {
        [Op.between]: [minPrice, maxPrice],
      };
    }
    const list = await models.purchases.findAll({
      where: {
        user_id: req.params.user_id,
      },
      order: [
        [models.items, "price", sortPrice ? sortPrice : "DESC"],
        [models.items, "price", sortPrice ? sortPrice : "ASC"],
      ],
      logging: true,
      include: [
        {
          as: "items",
          model: models.items,
          right: true,
          where: whereQuery,
        },
      ],
    });

    return res.json({
      list,
    });
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
};

module.exports = {
  purchasesController,
  listController,
};
