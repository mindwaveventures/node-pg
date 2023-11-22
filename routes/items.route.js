const express = require("express");

const router = express.Router();

const { validate } = require("../middlewares/validate.middleware");
const { itemaddSchema } = require("../validations/items.schema");

const { additemscontroller } = require("../controllers/items.controller");

router.post("/add-items", validate(itemaddSchema), additemscontroller);

module.exports = router;
