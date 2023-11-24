const express = require("express");
const router = express.Router();

const {
  getUsers,
  addUserController,
  updateUserController,
  loginController,
  getAccountController,
} = require("../controllers/user.controller");
const { validate } = require("../middlewares/validate.midddleware");
const {
  signUpSchema,
  updateUserSchema,
} = require("../validations/authentication.schema");

//CREATE USER ACCOUNT
router.post("/signup", validate(signUpSchema), addUserController);

//LOGIN
router.post("/login", loginController);

//UPDATE USER DATA
router.put("/user/:id", validate(updateUserSchema), updateUserController);

//VIEW THE USER DATA
router.get("/useraccount/:id", getAccountController);

module.exports = router;
