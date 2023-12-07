const { models, Sequelize } = require("../config/sequelize-config");
const Op = Sequelize.Op;

const cancelListController = async (req, res) => {
  try {
    if (!req.query.user_id) {
      return res.status(400).json({ error: "Please provide a user_id" });
    }
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
      whereQuery.price = {
        [Op.between]: [minPrice, maxPrice],
      };
    }
    const list = await models.purchases.findAll({
      where: {
        user_id: req.query.user_id,
        status: "Cancelled",
      },
      order: [
        [models.items, "price", sortPrice ? sortPrice : "ASC"],
        [models.items, "price", sortPrice ? sortPrice : "DESC"],
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
module.exports = { cancelListController };
