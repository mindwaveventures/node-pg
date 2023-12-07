const express = require("express");
const router = express.Router();
const getRouter = express.Router({ mergeParams: true });
const {
  isAuthorised,
  istokencheck,
} = require("../middlewares/authorisation.middleware");

const { getAccountController } = require("../controllers/user.controller");

router.use("/get-account", istokencheck, getRouter);

// //VIEW THE USER DATA
getRouter.get("/account-details", getAccountController);

module.exports = router;
