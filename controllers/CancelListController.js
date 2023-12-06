const config = require("../config/config");
// const pgClient = require('./pg-config');
const { sequelize, models, Sequelize } = require("../config/sequelize-config");

const Op = Sequelize.Op;

const updateStatusController = async function (req, res) {
  try {
    const updateStatus = await models.purchases.update(
      {
        status: req.body.status,
      },
      {
        where: {
          purchases_id: req.body.purchases_id,
        },
        returning: true,
      }
    );

    res.json({ updateStatus });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
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
    const getCancelOrder = await models.items.findAll({
      where: {
        user_id: req.query.user_id,
      },
      include: [
        {
          as: "purchases",
          model: models.purchases,
          where: { status: "Cancelled" },
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
            item_price: { [Sequelize.Op.between]: [minPrice, maxPrice] },
          },
        ],
      },
      order: [
        [
          "item_price",
          req.query.sortOrder && req.query.sortOrder.toUpperCase() === "DESC"
            ? "DESC"
            : "ASC",
        ],
      ],
    });
    res.json({
      getCancelOrder,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
module.exports = { updateStatusController, cancelListController };
