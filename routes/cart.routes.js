const express = require("express");
const router = express.Router();
const { validate } = require("../middlewares/validate.middleware");
const { addToCartSchema } = require("../validations/addToCartSchema");
const addCartcontroller = require("../controllers/cart.controller");

router.post("/add-cart", validate(addToCartSchema), addCartcontroller);
module.exports = router;
