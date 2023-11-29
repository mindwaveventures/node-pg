const express = require("express");
const router = express.Router();
const {
  addItemController,
  updateitemController,
} = require("../controllers/items.controller");
router.post("/add-items", addItemController);
router.patch("/update-item", updateitemController);

module.exports = router;
