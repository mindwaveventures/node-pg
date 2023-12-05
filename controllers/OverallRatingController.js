const overallRatingController = async (req, res) => {
  const ratings = await models.ratings.findAll({
    attributes: [
      "item_id",
      [Sequelize.fn("AVG", Sequelize.col("rating")), "overall_rating"],
    ],
    group: ["item_id"],
  });

  res.json({
    rows: ratings,
    count: ratings.length,
  });
};

module.exports = overallRatingController;
