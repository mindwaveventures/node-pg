const express = require("express");
const router = express.Router();
const { overallRatingController } = require("../controllers/ratingcontroller");
const {
  addUserController,
  loginController,
  accountViewController,
} = require("../controllers/usercontroller");
const { signUpSchema } = require("../validation/authentication.schema");
const { validate } = require("../middlewares/validate.middleware");

//get rating
router.get("/rating", overallRatingController);

router.post("/signup", validate(signUpSchema), addUserController);
router.post("/login", loginController);
router.get("/user/:id", accountViewController);
module.exports = router;
