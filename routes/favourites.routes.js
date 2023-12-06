const express = require("express");
const router = express.Router();

const {
  addfavoritescontroller,
  getFavController,
} = require("../controllers/favourites.controller");

router.post("/favourites", addfavoritescontroller);
router.get("/get-favourites", getFavController);

module.exports = router;
