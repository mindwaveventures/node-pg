const express = require("express");
const router = express.Router();

const {
  getUsers,
  addUserController,
} = require("../controllers/user.controller");

//GET
router.get("/u", getUsers);

//CREATE
router.post("/signup", addUserController);

module.exports = router;
