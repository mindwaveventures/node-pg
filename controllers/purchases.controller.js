const config = require("../config/config");
// const pgClient = require('./pg-config');
const { sequelize, models, Sequelize } = require("../config/sequelize-config");
const items = require("../models/items");
const Op = Sequelize.Op;

const purchasesController = async (req, res) => {
  //   const t = await models.sequelize.transaction();
  try {
    const purchase = await models.purchases.create(
      {
        user_id: req.body.user_id,
        item_id: req.body.item_id,
        status: req.body.status,
        //date_of_order: req.body.date_of_order,
      }
      //{ transaction: t }
    );
    const updatedItem = await models.items.decrement("item_count", {
      by: 1,
      where: {
        item_id: req.body.item_id,
      },
      //   transaction: t,
    });
    // await t.commit();

    return res.json({
      purchase,
      updatedItem,
    });
  } catch (error) {
    console.log(error);
    // await t.rollback();
    return res.send(error);
  }
};

const listController = async (req, res) => {
  try {
    const userId = req.params.user_id;
    const whereQuery = {};

    // whereQuery.user_id = {
    //   user_id: req.params.user_id,
    // };

    //search by item_name
    if (req.query.search) {
      whereQuery.item_name = {
        [Op.iLike]: `%${req.query.search}%`,
      };
    }

    if (req.query.sortPrice) {
      const sortPrice = req.query.sortPrice;
      console.log("sortPrice", sortPrice);
      whereQuery.item_price = {
        order: [["item_price", `${sortPrice}`]],
      };
    }

    if (req.query.priceRange) {
      const priceRanges = req.query.priceRange;
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
      logging: true,
      include: [
        {
          as: "items",
          model: models.items,
        },
      ],

      order: [["purchases_id", "ASC"]],
    });

    return res.json({
      list,
    });
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
};

// const PurchaseslistController = async (req, res) => {};
// try {
//   const WhereQuery = {};
//   WhereQuery.user_id = req.params.user_id;
//   const list = await models.purchases.findAll({
//     include: [
//       {
//         as: "items",
//         models: models.items,
//         where: WhereQuery,
//       },
//     ],
//   });

//   res.json({
//     rows: list,
//     count: list.length,
//   });
// } catch (err) {
//   console.log("Unknown Error:", err);
//   res.status(500).json({ error: "Unknown Error" });
// }

module.exports = {
  purchasesController,
  //PurchaseslistController,
  listController,
};
