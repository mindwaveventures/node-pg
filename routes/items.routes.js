const express = require("express");
const router = express.Router();
// const { validate } = require("../middlewares/validate.middleware");
// const {
//   itemaddSchema,
//   updateitemSchema,
// } = require("../validations/items.schema");
const {
  additemscontroller,
  updateitemController,
  getbysingleitemcontroller,
  getallitemcontroller,
} = require("../controllers/items.controller");
router.post("/add-items", additemscontroller);
router.patch(
  "/update-item-content",

  updateitemController
);
router.get("/"), getallitemcontroller;
router.get("/items/:itemId"), getbysingleitemcontroller;
module.exports = router;
