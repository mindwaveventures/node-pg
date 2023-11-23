const express = require("express");
const router = express.Router();
const { validate } = require("../middlewares/validate.middleware");
const {
  loginController,
  getAccountController,
} = require("../controllers/amazon.controllers");
const { loginSchema } = require("../validations/schemas");

router.post("/login", validate(loginSchema), loginController);
router.get("/account/:id", getAccountController);
// router.put()

module.exports = router;
