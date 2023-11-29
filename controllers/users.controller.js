const { models, Sequelize } = require("../config/sequelize-config");

// const { sequelize, models, Sequelize } = require("./config/sequelize-config");
const Op = Sequelize.Op;

const addUserController = async (req, res, next) => {
  try {
    console.log(
      req.body.first_name,
      req.body.last_name,
      req.body.email,
      req.body.user_name,
      req.body.user_password,
      req.body.phone_no
    );
    const addUser = await models.users.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      user_name: req.body.user_name,
      user_password: req.body.user_password,
      phone_no: req.body.phone_no,
    });
    if (addUser) {
      res.json({
        addUser,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  addUserController,
};
