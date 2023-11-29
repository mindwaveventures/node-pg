const { models, Sequelize } = require("../config/sequelize-config");

const addUserController = async (req, res, next) => {
  const searchUser = await models.users.findAll({
    attributes: ["email", "user_name"],
    where: { email: req.body.email, user_name: req.body.user_name },
  });
  if (searchUser.length == 0) {
    const usersCreate = await models.users.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      user_name: req.body.user_name,
      user_password: req.body.user_password,
      phone_no: req.body.phone_no,
    });
    res.json({
      usersCreate,
    });
  } else {
    return next({
      status: 400,
      message: "user already exits, check the email and username",
    });
  }
};
module.exports = {
  addUserController,
};
