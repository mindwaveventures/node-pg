const express = require("express");
const router = express.Router();
const purchasesController = require("../controllers/purchases.controller");
const listController = require("../controllers/purchases.controller");
router.post("/add-Purchases", purchasesController);
router.get("/listBoughtItems/:user_id", listController);
module.exports = router;
