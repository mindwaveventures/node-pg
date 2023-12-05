const config = require("../config/config");
const { models } = require("../config/sequelize-config");
const helper = require("../services/helper");
const jwt = require("jsonwebtoken");

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
        individualHooks: true,
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
    const searchUser = await models.users.findOne({
      where: {
        user_name: req.body.user_name,
      },
      returning: true,
    });

    if (searchUser.count == 0) {
      return next({
        status: 400,
        message: "user not found, check the email and username",
      });
    } else {
      const passwordMatch = await helper.comparePassword(
        req.body.user_password,
        searchUser.user_password
      );

      if (passwordMatch) {
        const payload = {
          user_id: searchUser.user_id,
          first_name: searchUser.first_name,
          user_name: searchUser.user_name,
        };
        const token = jwt.sign(payload, config.jwtSecret, { expiresIn: "1h" });
        return res.json({
          token,
        });
      }
      return res.status(403).send("Not valid");
    }
  } catch (error) {
    return res.send(error);
  }
};

// view the account details
const getAccountController = async (req, res, next) => {
  try {
    const usersFind = await models.users.findOne({
      attributes: ["email", "user_name"],
      where: {
        user_id: req.query.user_id || req.decoded.user_id,
      },
      logging: true,
    });
    return res.json({
      usersFind,
    });
  } catch (error) {
    console.log("\n error...", error);
    return res.send(error);
  }
};
const getAccountByIdController = async (req, res, next) => {
  try {
    const usersFind = await models.users.findOne({
      attributes: ["email", "user_name"],
      where: {
        user_id: req.query.user_id,
      },
      logging: true,
    });
    return res.json({
      usersFind,
    });
  } catch (error) {
    console.log("\n error...", error);
    return res.send(error);
  }
};

module.exports = {
  addUserController,
  updateUserController,
  loginController,
  getAccountController,
  getAccountByIdController,
};
