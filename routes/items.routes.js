const express = require("express");
const { validate } = require("../middlewares/validate.middleware");
const { addItemController } = require("../controllers/items.controller");
const { itemaddSchema } = require("../validation/items.schema");
const itemRouter = express.Router();

itemRouter.post("/add-items", validate(itemaddSchema), addItemController);

module.exports = itemRouter;
