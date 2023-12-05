const express = require("express");
const router = express.Router();
const { validate } = require("../middlewares/validate.middleware");
const { ratingValueSchema } = require("../validations/rating.schema");
const { addRatingController } = require("../controllers/addRating.controller");

router.post("/add-rating", validate(ratingValueSchema), addRatingController);
module.exports = router;
