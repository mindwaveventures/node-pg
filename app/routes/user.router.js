const express = require("express");
const router = express.Router();

const {
  getUsers,
  addUserController,
} = require("../controllers/user.controller");
const { validate } = require("../middlewares/validate.midddleware");
const { signUpSchema } = require("../validations/authentication.schema");

//GET
router.get("/u", getUsers);

//CREATE
router.post("/signup", validate(signUpSchema), addUserController);

module.exports = router;
