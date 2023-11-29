const express = require("express");
const router = express.Router();
const { validate } = require("../middlewares/validate.middleware");

const { addUserController } = require("../controllers/users.controller");
const { signUpSchema } = require("../validations/authentication.schema");

router.post("/signup", validate(signUpSchema), addUserController);

module.exports = router;
