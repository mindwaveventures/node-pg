const { models } = require("../config/sequelize-config");
const purchases = require("../models/purchases");

const buyItemController = async (req, res) => {
  try {
    const purchase = await models.purchases.crate({
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
    return res.status(400).res.json({ message: error });
  }
};
const PurchasesListController = async (req, res) => {
  try {
    let sortPrice;
    const userId = req.params.user_id;
    let whereQuery = {};
    let orderQuery = [];

    //search by item_name
    if (req.query.search) {
      whereQuery.item_name = {
        [Op.iLike]: `%${req.query.search}%`,
      };
    }

    if (req.query.sortPrice) {
      sortPrice = req.query.sortPrice;
      orderQuery.push(["item_price", sortPrice]);
    }

    if (req.query.priceRange) {
      const priceRanges = req.query.priceRange.split("-");
      const minPrice = parseFloat(priceRanges[0]);
      const maxPrice = parseFloat(priceRanges[1]);
      whereQuery.item_price = {
        [Op.between]: [minPrice, maxPrice],
      };
    }
    const list = await models.purchases.findAll({
      where: {
        user_id: req.params.user_id,
      },
      order: [[models.items, "item_price", sortPrice ? sortPrice : "DESC"]],
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
    return res.status(400).res.json({ message: error.message });
  }
};

// update to cancel
const updateStatusController = async function (req, res) {
  try {
    const updateStatus = await purchases.models.update(
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

    let query =
      "SELECT purchases.*, items.item_name FROM purchases JOIN items ON purchases.item_id = items.item_id WHERE purchases.order_status = 'Cancelled'";

    if (req.query.user_id) {
      query += ` AND purchases.user_id = ${req.query.user_id}`;
    }

    if (req.query.search) {
      query += ` AND items.item_name ILIKE '%${req.query.search}%'`;
    }

    if (req.query.sortOrder) {
      const sortOrder =
        req.query.sortOrder.toUpperCase() === "DESC" ? "DESC" : "ASC";
      query += ` ORDER BY items.price ${sortOrder}`;
    }

    if (req.query.priceRange) {
      const priceRanges = req.query.priceRange.split("-");
      const minPrice = parseFloat(priceRanges[0]);
      const maxPrice = parseFloat(priceRanges[1]);

      query += ` AND items.price BETWEEN $1 AND $2`;

      const pgRes = await pgClient.query(query, [minPrice, maxPrice]);
      res.json({
        rows: pgRes.rows,
        count: pgRes.rowCount,
      });
    } else {
      const pgRes = await pgClient.query(query);
      res.json({
        rows: pgRes.rows,
        count: pgRes.rowCount,
      });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  buyItemController,
  PurchasesListController,
  updateStatusController,
  cancelListController,
};
