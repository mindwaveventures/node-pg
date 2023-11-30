const express = require("express");
const router = express.Router();
const { validate } = require("../middlewares/validate.middleware");
const { buyItemSchema } = require("../validations/buyItem.schema");
const { purchasesController } = require("../controllers/purchases.controller");
const { listController } = require("../controllers/purchases.controller");
router.post("/add-Purchases", validate(buyItemSchema), purchasesController);
router.get("/listBoughtItems/:user_id", listController);
module.exports = router;
