const config = require("../config/config");
// const pgClient = require('./pg-config');
const { sequelize, models, Sequelize } = require("../config/sequelize-config");
const Op = Sequelize.Op;

const addItemController = async (req, res) => {
  try {
    const usersCreate = await models.users.create({
      name: req.body.name,
    });
    return res.json({
      usersCreate,
    });
  } catch {
    console.log("\n error...", error);
    return res.send(error);
  }
};
module.exports = {
  addItemController,
};
