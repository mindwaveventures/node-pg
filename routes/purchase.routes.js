const express = require("express");
const router = express.Router();
const purchasesController = require("../controllers/purchases.controller");
router.post("/add-Purchases", purchasesController);
module.exports = router;
