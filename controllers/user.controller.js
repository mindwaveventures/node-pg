const config = require("../config/config");
const { sequelize, models, Sequelize } = require("../config/sequelize-config");
const Op = Sequelize.Op;

const addUserController = async (req, res) => {
  try {
    const userCreate = await models.users.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      user_name: req.body.user_name,
      user_password: req.body.user_password,
      phone_no: req.body.phone_no,
    });
    return res.json({
      userCreate,
    });
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
};

module.exports = {
  addUserController,
};
