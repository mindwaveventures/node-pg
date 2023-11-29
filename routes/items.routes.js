const express = require("express");
const router = express.Router();
const {
  addItemController,
  updateitemController,
  getallitemcontroller,
  getbysingleitemcontroller,
  sortPriceAscendingcontroller,
  sortPriceDecendingcontroller,
  filterItemPricecontroller,
  sortItemnameAScensingcontroller,
  sortItemnameDecensingcontroller,
  SearchItemNamecontroller,
} = require("../controllers/items.controller");
router.post("/add-items", addItemController);
router.patch("/update-item", updateitemController);
router.get("/items", getallitemcontroller);
router.get("/", getbysingleitemcontroller);
// router.post("/favourites", addfavoritescontroller);
router.get("/sort/asc-by-price", sortPriceAscendingcontroller);
router.get("/sort/dec-by-price", sortPriceDecendingcontroller);
router.get("/sort/asc-by-item-name", sortItemnameAScensingcontroller);
router.get("/sort/dec-by-item-name", sortItemnameDecensingcontroller);
router.get("/filter", filterItemPricecontroller);
router.get("/search", SearchItemNamecontroller);
module.exports = router;
