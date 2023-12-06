const express = require("express");
const purcharseRouter = express.Router();
const cancelListController = require("../controllers/CancelListController");
const updateStatusController = require("../controllers/UpdateStatusController");
const { purchasesController } = require("../controllers/purchases.controller");

purcharseRouter.post("/add-Purchases", purchasesController);

purcharseRouter.get("/cancellist", cancelListController);

purcharseRouter.put("/cancel", updateStatusController);

module.exports = purcharseRouter;
