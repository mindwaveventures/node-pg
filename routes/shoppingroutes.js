const express = require("express");
const { ratingValueSchema } = require("../validation/ratingValueSchema");
const { addToCartSchema } = require("../validation/addToCartSchema");
const { buyItemSchema } = require("../validation/buyItemSchema");
const { validate } = require("../middlewares/validate.middleware");
// const pgClient = require("../pg-config");
const router = express.Router();
const {
  addRatingController,
  addToCartController,
  buyItemController,
} = require("../controllers/shoppingController");

// router.post("/addRating", async function (req, res) {
//   const queryText =
//     "INSERT INTO rating(item_id,user_id,ratingvalue) VALUES($1,$2,$3) RETURNING item_id,user_id,ratingvalue";
//   const pgRes = await pgClient.query(queryText, [
//     req.body.item_id,
//     req.body.user_id,
//     req.body.ratingValue,
//   ]);

//   res.json({
//     rows: pgRes.rows,
//     count: pgRes.rowCount,
//   });
// });

router.post("/addRating", validate(ratingValueSchema), addRatingController);
router.post("/addToCart", validate(addToCartSchema), addToCartController);
router.post("/buyItem", validate(buyItemSchema), buyItemController);
module.exports = router;
