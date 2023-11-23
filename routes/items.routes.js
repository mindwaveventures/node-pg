const express = require("express");
const router = express.Router();
// const { validate } = require("../middlewares/validate.middleware");
const {
  itemaddSchema,
  updateitemSchema,
} = require("../validations/items.schema");

const {
  additemcontroller,
  updateitemcontentcontroller,
  addfavouritecontroller,
  getsingleitemcontroller,
  getlistofitemscontroller,
  sortpriceasccontroller,
  sortpricedesccontroller,
  sortitemnameasccontroller,
  sortItemnameDescController,
  filterPriceController,
  searchController,
} = require("../controller/items.controller");

router.post("/add-items", validate(itemaddSchema), additemcontroller);
router.get("/items", getlistofitemscontroller);
router.patch("/update-item-content", updateitemcontentcontroller);
router.post("/favourites", addfavouritecontroller);
router.get("/items/:itemId", getsingleitemcontroller);
router.get("/sort/asc-by-price", sortpriceasccontroller);
router.get("/sort/desc-by-price", sortpricedesccontroller);
router.get("/sort/asc-by-itemname", sortitemnameasccontroller);
router.get("/sort/desc-by-itemname", sortItemnameDescController);
router.get("/filter", filterPriceController);
router.get("/search", searchController);

module.exports = router;
