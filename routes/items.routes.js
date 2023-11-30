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
  sortItemNameController,
} = require("../controllers/items.controller");
const {
  addfavoritescontroller,
} = require("../controllers/favourites.controller");
const { validate } = require("../middlewares/validate.middleware");
const {
  itemaddSchema,
  updateitemSchema,
} = require("../validations/items.schema");

router.post("/add-items", validate(itemaddSchema), addItemController);
router.patch("/update-item", validate(updateitemSchema), updateitemController);
router.get("/items", getallitemcontroller);
router.get("/get-one-item", getbysingleitemcontroller);
router.post("/favourites", addfavoritescontroller);
router.get("/sort/asc-by-price", sortPriceAscendingcontroller);
router.get("/sort/dec-by-price", sortPriceDecendingcontroller);
router.get("/sort/asc-by-item-name", sortItemnameAScensingcontroller);
router.get("/sort/dec-by-item-name", sortItemnameDecensingcontroller);
router.get("/filter", filterItemPricecontroller);
router.get("/search", SearchItemNamecontroller);
router.get("/sort-by-name", sortItemNameController);

module.exports = router;
