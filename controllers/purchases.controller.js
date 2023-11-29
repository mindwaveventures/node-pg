const config = require("../config/config");
// const pgClient = require('./pg-config');
const { sequelize, models, Sequelize } = require("../config/sequelize-config");
// const Op = Sequelize.Op;

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
    const boughtItems = await models.purchases.findAll({
      where: {
        user_id: req.params.user_id,
      },
    });

    return res.json({
      items,
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
