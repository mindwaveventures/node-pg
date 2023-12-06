const config = require("../config/config");
const { sequelize, models, Sequelize } = require("../config/sequelize-config");
const Op = Sequelize.Op;

const addfavoritescontroller = async (req, res) => {
  try {
    const favouriteCreate = await models.favourites.create({
      user_id: req.body.user_id,
      item_id: req.body.item_id,
    });
    return res.json({
      favouriteCreate,
    });
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
};
const getFavController = async (req, res) => {
  try {
    if (!req.query.user_id) {
      return res.status(400).json({ error: "Please provide a user_id" });
    }

    const items = await models.items.findAll({
      include: [
        {
          model: models.favourites,
          where: { user_id: req.query.user_id },
        },
      ],
      where: {
        item_name: {
          [Sequelize.Op.iLike]: `%${req.query.search || ""}%`,
        },
      },
      order: [
        [
          "price",
          req.query.sortOrder && req.query.sortOrder.toUpperCase() === "DESC"
            ? "DESC"
            : "ASC",
        ],
      ],
      attributes: ["item_name", "price"],
      logging: true,
    });

    res.json({
      rows: items,
      count: items.length,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
module.exports = {
  addfavoritescontroller,
  getFavController,
};
