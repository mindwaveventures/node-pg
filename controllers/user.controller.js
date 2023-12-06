const helper = require("../services/helper");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const { models, Sequelize } = require("../config/sequelize-config");
const Op = Sequelize.Op;

//creating new user account
const addUserController = async (req, res, next) => {
  try {
    const searchUser = await models.users.findAndCountAll({
      where: {
        email: req.body.email,
        user_name: req.body.user_name,
      },
      logging: true,
    });

    if (searchUser.count == 0) {
      const addUser = await models.users.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        user_name: req.body.user_name,
        user_password: req.body.user_password,
        phone_no: req.body.phone_no,
      });
      res.json({
        addUser,
      });
    } else {
      return next({
        status: 400,
        message: "user already exits, check the email and username",
      });
    }
  } catch (error) {
    return res.json({
      message: error.errors.map((d) => d.message),
    });
  }
};

// login
const loginController = async (req, res) => {
  try {
    const searchUser = await models.users.findOne({
      //attributes: ["email", "user_name"],
      where: {
        user_name: req.body.user_name,
      },
      logging: true,
    });

    const passwordMatch = await helper.comparePassword(
      req.body.user_password,
      searchUser.user_password
    );
    if (passwordMatch) {
      const payload = {
        user_id: searchUser.user_id,
        user_name: searchUser.user_name,
      };
      const generated_token = jwt.sign(payload, config.jwtSecret, {
        expiresIn: "1h",
      });
      const updateUser = await models.users.update(
        {
          token: generated_token,
        },
        {
          where: {
            id: searchUser.id,
          },
          returning: true,
        }
      );
      return res.json({
        updateUser,
      });
    }
    return res.status(403).json({ message: "Not valid" });
  } catch (error) {
    return res.json({ message: error.message });
  }
};

// view the account details
const getAccountController = async (req, res, next) => {
  //"select * from account_users au where id = $1";
  try {
    const getUserController = await models.users.findOne({
      where: {
        user_id: req.decoded.id,
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

module.exports = {
  addUserController,
  loginController,
  getAccountController,
  updateUserController,
};
