const express = require("express");
const ratingRouter = express.Router();
const { validate } = require("../middlewares/validate.middleware");
const { ratingValueSchema } = require("../validation/ratingValue.schema");
const { addRatingController } = require("../controllers/ratingcontroller");
ratingRouter.post(
  "/add-rating",
  validate(ratingValueSchema),
  addRatingController
);
module.exports = ratingRouter;
