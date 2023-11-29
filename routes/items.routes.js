const express = require("express");
const router = express.Router();
const { addItemController } = require("../controllers/items.controller");
router.post("/add-items", addItemController);
module.exports = router;
