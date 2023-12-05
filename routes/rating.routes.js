const express = require("express");
const router = express.Router();
const { validate } = require("../middlewares/validate.middleware");
const { ratingValueSchema } = require("../validation/ratingValue.schema");
const {
  addRatingController,
  overallRatingController,
} = require("../controllers/ratingcontroller");

router.post("/add-rating", validate(ratingValueSchema), addRatingController);

router.get("/overallRating", overallRatingController);

module.exports = router;
