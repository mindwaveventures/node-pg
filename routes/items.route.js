const express = require("express");

const router = express.Router();

const {
  validate,
  updatevalidate,
} = require("../middlewares/validate.middleware");
const {
  additemSchema,
  updateitemSchema,
} = require("../validations/items.schema");

const {
  additemscontroller,
  updateitemController,
  getbysingleitemcontroller,
} = require("../controllers/items.controller");

router.post("/add-items", validate(additemSchema), additemscontroller);

router.patch(
  "/update-item-content",
  validate(updateitemSchema),
  updateitemController
);

router.get("/items/:itemId"), getbysingleitemcontroller;

module.exports = router;
