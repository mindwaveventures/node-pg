const express = require("express");
const { ratingValueSchema } = require("../validations/ratingValueSchema");
const { addToCartSchema } = require("../validations/addToCartSchema");
const { buyItemSchema } = require("../validations/buyItemSchema");
const { validate } = require("../middlewares/validate.middleware");
const router = express.Router();
const {
  addRatingController,
  addToCartController,
  buyItemController,
  listController,
  overallRatingController,
} = require("../controllers/shoppingController");

router.post("/addRating", validate(ratingValueSchema), addRatingController);
router.post("/getRating", overallRatingController);

router.post("/addToCart", validate(addToCartSchema), addToCartController);
router.post("/buyItem", validate(buyItemSchema), buyItemController);
router.get("/listBoughtItems/:user_id", listController);
module.exports = router;
