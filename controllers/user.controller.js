const Joi = require("joi");

const { models, Sequelize } = require("../config/sequelize-config");
const Op = Sequelize.Op;

//creating new user account
const addUserController = async (req, res, next) => {
  const searchUser = await models.users.findAndCountAll({
    attributes: ["email", "user_name"],
    where: {
      email: req.body.email,
      user_name: req.body.user_name,
    },
    returning: true,
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
};

//updating the userData
const updateUserController = async (req, res, next) => {
  const userData = "select * from account_users au where id = $1";
  const idpgRes = await pgClient.query(userData, [req.params.id]);

  const userToUpdate = idpgRes.rows[0];

  if (!userToUpdate) {
    return next({
      status: 400,
      message: "user not found",
    });
  }
  const searchQuery =
    "select * from account_users au where email = $1 or username = $2";
  const searchPgRes = await pgClient.query(searchQuery, [
    req.body.email,
    req.body.username,
  ]);

  if (searchPgRes.rowCount == 0) {
    const queryText =
      "update account_users set first_name  = $1, last_name=$2, email=$3, username=$4, user_password=$5, phone_no=$6 where id = $7  returning *";
    const pgRes = await pgClient.query(queryText, [
      req.body.first_name || userToUpdate.first_name,
      req.body.last_name || userToUpdate.last_name,
      req.body.email || userToUpdate.email,
      req.body.username || userToUpdate.username,
      req.body.user_password || userToUpdate.user_password,
      req.body.phone_no || userToUpdate.phone_no,
      req.params.id,
    ]);
    res.json({
      rows: pgRes.rows,
      count: pgRes.rowCount,
    });
  } else {
    return next({
      status: 400,
      message: "user already exits, check the email and username",
    });
  }
};

// login
const loginController = async (req, res, next) => {
  const searchUser = await models.users.findOne({
    //attributes: ["email", "user_name"],
    where: {
      email: req.body.email,
      user_name: req.body.user_name,
    },
    returning: true,
  });

  if (!searchUser) {
    return next({
      status: 400,
      message: "user not found",
    });
  }

  res.json({
    searchUser,
  });
};

// view the account details
const getAccountController = async (req, res, next) => {
  const queryText = "select * from account_users au where id = $1";
  const pgRes = await pgClient.query(queryText, [req.params.id]);
  const idpgRes = pgRes.rows[0];

  if (!idpgRes) {
    return next({
      status: 400,
      message: "user not found",
    });
  }

  res.json({
    rows: pgRes.rows,
    count: pgRes.rowCount,
  });
};

module.exports = {
  addUserController,
  updateUserController,
  loginController,
  getAccountController,
};
