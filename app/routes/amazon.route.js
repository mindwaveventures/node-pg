const express = require("express");
const router = express.Router();
const loginController = require("../controllers/amazon.controllers");

router.post("/login", loginController);

module.exports = router;
