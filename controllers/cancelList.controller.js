const { models, Sequelize } = require("../config/sequelize-config");
const Op = Sequelize.Op;

const cancelListController = async (req, res) => {
  try {
    if (!req.query.user_id) {
      return res.status(400).json({ error: "Please provide a user_id" });
    }

    const purchases = await models.purchases.findAll({
      include: [
        {
          as: "items",

          model: models.items,
          where: { item_id: Sequelize.col("purcharses.item_id") },
          attributes: ["item_name"],
        },
      ],
      where: {
        status: "Cancelled",
        user_id: req.query.user_id,
        "$items.item_name$": {
          [Op.iLike]: `%${req.query.search || ""}%`,
        },
      },
      order: [["items.price", req.query.sortOrder ? "DESC" : "ASC"]],
      attributes: ["purchases_id", "status"],
    });

    res.json({
      rows: purchases,
      count: purchases.length,
    });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};
module.exports = { cancelListController };
