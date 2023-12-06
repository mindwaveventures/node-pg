const { sequelize, models, Sequelize } = require("../config/sequelize-config");
const Op = Sequelize.Op;

const updateStatusController = async function (req, res) {
  try {
    const updatedPurchase = await models.purchases.update(
      { status: req.body.status },
      {
        where: { id: req.body.id },
        returning: true,
      }
    );

    res.json({
      rows: updatedPurchase[1],
      count: updatedPurchase[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = updateStatusController;
