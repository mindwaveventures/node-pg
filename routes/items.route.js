const express = require("express");

const router = express.Router();

const { validate } = require("../middlewares/validate.middleware");
const {
  itemaddSchema,
  updateitemSchema,
} = require("../validations/items.schema");

const {
  additemscontroller,
  updateitemController,
  getbysingleitemcontroller,
  getallitemcontroller,
  addfavoritescontroller,
  sortPriceAscendingcontroller,
  sortPriceDecendingcontroller,
} = require("../controllers/items.controller");

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

module.exports = router;
