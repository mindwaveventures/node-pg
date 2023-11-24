const express = require("express");

const router = express.Router();

const { validate } = require("../app/middlewares/validate.middleware");
const {
  itemaddSchema,
  updateitemSchema,
} = require("../validations/items.schema");

const {
  additemscontroller,
  updateitemController,
  getbysingleitemcontroller,
  getallitemcontroller,
  sortPriceAscendingcontroller,
  sortPriceDecendingcontroller,
  sortItemnameAScensingcontroller,
  sortItemnameDecensingcontroller,
  filterItemPricecontroller,
  SearchItemNamecontroller,
} = require("../app/controllers/items.controller");
const {
  addfavoritescontroller,
} = require("../app/controllers/favourites.controller");

router.post("/add-items", validate(itemaddSchema), additemscontroller);
router.patch(
  "/update-item-content",
  validate(updateitemSchema),
  updateitemController
);
router.get("/items", getallitemcontroller);
router.get("/items/:itemId", getbysingleitemcontroller);
router.post("/favourites", addfavoritescontroller);
router.get("/sort/asc-by-price", sortPriceAscendingcontroller);
router.get("/sort/dec-by-price", sortPriceDecendingcontroller);
router.get("/sort/asc-by-item-name", sortItemnameAScensingcontroller);
router.get("/sort/dec-by-item-name", sortItemnameDecensingcontroller);
router.get("/filter", filterItemPricecontroller);
router.get("/search", SearchItemNamecontroller);

module.exports = router;
