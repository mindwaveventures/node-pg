// const { models, Sequelize } = require("../config/sequelize-config");
// const Op = Sequelize.Op;

// const cancelListController = async (req, res) => {
//   try {
//     if (!req.query.user_id) {
//       return res.status(400).json({ error: "Please provide a user_id" });
//     }

//     const purchases = await models.purchases.findAll({
//       include: [
//         {
//           model: models.items,
//           where: { user_id: req.query.user_id },
//         },
//       ],
//       where: {
//         status: "Cancelled",
//         // user_id: req.query.user_id,
//         // "$items.item_name$": {
//         //   [Sequelize.Op.iLike]: `%${req.query.search || ""}%`,
//         // },
//       },
//       logging: true,

//       order: [
//         [
//           "items.price",
//           req.query.sortOrder && req.query.sortOrder.toUpperCase() === "DESC"
//             ? "DESC"
//             : "ASC",
//         ],
//       ],
//       attributes: ["purchase_id", "status"],
//     });

//     res.json({
//       purchases,
//       //   count: purchases.length,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: error.message });
//   }
// };
// module.exports = cancelListController;
