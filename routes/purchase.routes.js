const express = require("express");
const purcharseRouter = express.Router();
const updateStatusController = require("../controllers/UpdateStatusController");
const {
  purchasesController,
  cancelListController,
} = require("../controllers/purchases.controller");

purcharseRouter.post("/add-Purchases", purchasesController);

purcharseRouter.get("/cancellist", cancelListController);

purcharseRouter.put("/cancel", updateStatusController);

module.exports = purcharseRouter;
