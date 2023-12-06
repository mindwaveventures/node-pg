const express = require("express");
const router = express.Router();

const {
  cancelListController,
} = require("../controllers/cancelList.controller");

router.get("/get-cancel", cancelListController);

module.exports = router;
