const config = require("../config/config");
const { sequelize, models, Sequelize } = require("../config/sequelize-config");
const Op = Sequelize.Op;

const addUserController = async (req, res) => {
  const searchUser = await models.users.findAndCountAll({
    attributes: ["email", "user_name"],
    where: {
      email: req.body.email,
      user_name: req.body.user_name,
    },
    returning: true,
  });

  if (searchUser.count == 0) {
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
  } else {
    return res.send("user already found");
  }
};

//updating the userData
const updateUserController = async (req, res) => {
  try {
    const updateUser = await models.users.update(
      {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        user_name: req.body.user_name,
        user_password: req.body.user_password,
        phone_no: req.body.phone_no,
      },
      {
        where: {
          user_id: req.params.id,
        },
        returning: true,
      }
    );

    res.json({
      updateUser,
    });
  } catch (error) {
    return res.send({
      message: error.errors.map((d) => d.message),
    });
  }
};

// login
const loginController = async (req, res, next) => {
  try {
    const searchUser = await models.users.findAndCountAll({
      //attributes: ["email", "user_name"],
      where: {
        user_name: req.body.user_name,
        user_password: req.body.user_password,
      },
      returning: true,
    });

    if (searchUser.count == 0) {
      return next({
        status: 400,
        message: "user not found, check the email and username",
      });
    } else {
      res.json({
        searchUser,
      });
    }
  } catch (error) {
    return res.send(error);
  }
};

// view the account details
const getAccountController = async (req, res, next) => {
  //"select * from account_users au where id = $1";
  try {
    const getUserController = await models.users.findOne({
      where: {
        user_id: req.params.id,
      },
      returning: true,
    });

    res.json({
      getUserController,
    });
  } catch (error) {
    return next({
      status: 400,
      message: "unknown user id",
    });
  }
};

module.exports = {
  addUserController,
  updateUserController,
  loginController,
  getAccountController,
};
