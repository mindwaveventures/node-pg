const cancelListController = async (req, res) => {
  try {
    if (!req.query.user_id) {
      return res.status(400).json({ error: "Please provide a user_id" });
    }

    const purchases = await models.purcharse.findAll({
      include: [
        {
          model: models.items,
          where: { item_id: Sequelize.col("purcharse.item_id") },
          attributes: ["item_name"],
        },
      ],
      where: {
        status: "Cancelled",
        user_id: req.query.user_id,
        "$items.item_name$": {
          [Sequelize.Op.iLike]: `%${req.query.search || ""}%`,
        },
      },
      order: [
        [
          "items.price",
          req.query.sortOrder && req.query.sortOrder.toUpperCase() === "DESC"
            ? "DESC"
            : "ASC",
        ],
      ],
      attributes: ["purchase_id", "status"],
    });

    res.json({
      rows: purchases,
      count: purchases.length,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
