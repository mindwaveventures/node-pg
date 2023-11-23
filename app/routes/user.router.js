const express = require("express");
const router = express.Router();

const {
  getUsers,
  addUserController,
  updateUserController,
} = require("../controllers/user.controller");
const { validate } = require("../middlewares/validate.midddleware");
const {
  signUpSchema,
  updateUserSchema,
} = require("../validations/authentication.schema");

//CREATE
router.post("/signup", validate(signUpSchema), addUserController);

//UPDATE
router.put("/user/:id", validate(updateUserSchema), updateUserController);

module.exports = router;
