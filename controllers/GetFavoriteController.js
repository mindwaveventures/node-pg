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
      whereQuery.item_price = {
        [Op.between]: [minPrice, maxPrice],
      };
    }
    const getFavourites = await models.favourites.findAll({
      where: {
        user_id: req.query.user,
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
      getFavourites,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports = {
  getFavController,
  addfavoritescontroller,
};
