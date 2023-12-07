const { models, Sequelize } = require("../config/sequelize-config");
const Op = Sequelize.Op;

const addPurchaseController = async (req, res) => {
  try {
    const purchase = await models.purchases.create({
      item_id: req.xop.item_id,
      user_id: req.xop.user_id,
      order_status: req.xop.order_status,
    });
    const updatedItem = await models.items.decrement("item_count", {
      by: 1,
      where: {
        item_id: req.body.item_id,
      },
    });

    res.json({
      purchase,
      updatedItem,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};
const PurchasesListController = async (req, res) => {
  try {
    let sortPrice;
    let whereQuery = {};

    //search by item_name
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
    const purchaseList = await models.purchases.findAll({
      attributes: ["order_status", "purchase_id"],
      where: {
        user_id: req.query.user_id,
      },
      order: [[models.items, "item_price", sortPrice ? sortPrice : "DESC"]],
      include: [
        {
          model: models.items,
          where: whereQuery,
          attributes: ["item_name", "item_content", "item_price"],
        },
      ],
      logging: true,
    });

    return res.json({
      purchaseList,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// update to cancel
const updateStatusController = async function (req, res) {
  try {
    const updateStatus = await models.purchases.update(
      {
        order_status: req.body.order_status,
      },
      {
        where: {
          purchase_id: req.body.purchase_id,
        },
        returning: true,
      }
    );

    res.json({ updateStatus });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

//cancel
const cancelListController = async (req, res) => {
  try {
    if (!req.query.user_id) {
      return res.status(400).json({ error: "Please provide a user_id" });
    }

    let sortPrice;
    let whereQuery = {};

    //search by item_name
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
    const getCancelOrder = await models.purchases.findAll({
      attributes: ["order_status", "purchase_id"],
      where: {
        user_id: req.query.user_id,
        order_status: "Cancelled",
      },
      order: [[models.items, "item_price", sortPrice ? sortPrice : "DESC"]],
      include: [
        {
          model: models.items,
          where: whereQuery,
          attributes: ["item_name", "item_content", "item_price"],
        },
      ],
      logging: true,
    });

    res.json({
      getCancelOrder,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addPurchaseController,
  PurchasesListController,
  updateStatusController,
  cancelListController,
};
