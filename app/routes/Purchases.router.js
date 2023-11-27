const express = require("express");
const { ratingValueSchema } = require("../validations/ratingValueSchema");
const { addToCartSchema } = require("../validations/addToCartSchema");
const { buyItemSchema } = require("../validations/buyItemSchema");
const { validate } = require("../middlewares/validate.middleware");
// const pgClient = require("../pg-config");
const router = express.Router();
const { addRatingController } = require("../controllers/addRatingController");
const { addToCartController } = require("../controllers/addToCartController");
const {
  buyItemController,
  PurchaseslistController,
} = require("../controllers/PurchasesController");

router.post("/addRating", validate(ratingValueSchema), addRatingController);
router.post("/addToCart", validate(addToCartSchema), addToCartController);
router.post("/buyItem", validate(buyItemSchema), buyItemController);
router.get("/listBoughtItems/:user_id", PurchaseslistController);
module.exports = router;
