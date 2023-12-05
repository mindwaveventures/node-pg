const express = require("express");
const favRouter = express.Router();

const {
  getFavController,
  addfavoritescontroller,
} = require("../controllers/GetFavoriteController");

favRouter.get("/getfavourite", getFavController);
favRouter.post("/favourites", addfavoritescontroller);

module.exports = favRouter;
