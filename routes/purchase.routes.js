const express = require("express");
const purcharseRouter = express.Router();
const { validate } = require("../middlewares/validate.middleware");
const cancelListController = require("../controllers/CancelListController");
const {
  PurchaseslistController,
} = require("../controllers/purchases.controller");
const { purchasesController } = require("../controllers/purchases.controller");
purcharseRouter.post("/add-Purchases", purchasesController);

purcharseRouter.get("/cancel/list", cancelListController);
module.exports = purcharseRouter;
