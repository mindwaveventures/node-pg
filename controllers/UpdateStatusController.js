const updateStatusController = async function (req, res) {
  try {
    const updatedPurchase = await models.purcharse.update(
      { status: req.body.status },
      {
        where: { purchase_id: req.body.purchaseid },
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
