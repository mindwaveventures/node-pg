const express = require("express");
const router = express.Router();
const { addRatingController } = require("../controllers/addRating.controller");
router.post("/add-rating", addRatingController);
module.exports = router;
