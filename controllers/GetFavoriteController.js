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
