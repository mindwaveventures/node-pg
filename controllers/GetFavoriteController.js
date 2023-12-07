const { models, Sequelize } = require("../config/sequelize-config");
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
    let minPrice;
    let maxPrice;
    if (!req.query.user_id) {
      return res.status(400).json({ error: "Please provide a user_id" });
    }

    if (req.query.priceRange) {
      const priceRanges = req.query.priceRange.split("-");
      minPrice = parseFloat(priceRanges[0]);
      maxPrice = parseFloat(priceRanges[1]);
    }

    const items = await models.items.findAll({
      include: [
        {
          model: models.favourites,
          where: { user_id: req.query.user_id },
        },
      ],
      where: {
        [Op.or]: [
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
  getFavController,
  addfavoritescontroller,
};
