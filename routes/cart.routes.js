const express = require("express");
const router = express.Router();
const addCartcontroller = require("../controllers/cart.controller");
router.post("/add-cart", addCartcontroller);
module.exports = router;
