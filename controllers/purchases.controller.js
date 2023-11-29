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
module.exports = purchasesController;
// const purchasesController = async (req, res) => {
//   const { user_id, item_id, status, date_of_order } = req.body;

//   const t = await models.sequelize.transaction();

//   try {
//     // Step 1: Create a new purchase
//     const purchase = await models.purchases.create(
//       {
//         user_id,
//         item_id,
//         status,
//         date_of_order,
//       },
//       { transaction: t }
//     );

//     // Step 2: Update items_count in the items table
//     const updatedItem = await models.items.decrement('items_count', {
//       by: 1,
//       where: { item_id },
//       transaction: t
//     });

//     // Commit the transaction
//     await t.commit();

//     return res.json({
//       purchase,
//       updatedItem,
//     });
//   } catch (error) {
//     // Rollback the transaction if an error occurs
//     await t.rollback();

//     console.error(error);
//     return res.status(500).json({
//       error: "Internal Server Error",
//     });
//   }
// };

// module.exports = purchasesController;
