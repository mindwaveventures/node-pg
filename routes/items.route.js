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

module.exports = router;
