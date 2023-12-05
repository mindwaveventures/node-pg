const express = require("express");
const router = express.Router();
const { isAuthorised } = require("../middlewares/authorisation.middleware");

const {
  addUserController,
  updateUserController,
  loginController,
} = require("../controllers/user.controller");
const { validate } = require("../middlewares/validate.middleware");
const {
  signUpSchema,
  updateUserSchema,
} = require("../validations/authentication.schema");

//CREATE USER ACCOUNT
router.post("/signup", validate(signUpSchema), addUserController);

// //LOGIN
router.post("/login", loginController);

// //UPDATE USER DATA
router.put("/user/:id", validate(updateUserSchema), updateUserController);

module.exports = router;
