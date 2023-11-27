const pgClient = require("../pg-config");
const Joi = require("joi");

//creating new user account
const addUserController = async (req, res, next) => {
  const searchQuery =
    "select * from account_users au where email = $1 or user_name = $2";
  const searchPgRes = await pgClient.query(searchQuery, [
    req.body.email,
    req.body.user_name,
  ]);

  if (searchPgRes.rowCount == 0) {
    const queryText =
      "INSERT INTO account_users(first_name, last_name, email, user_name, user_password, phone_no) VALUES($1,$2,$3,$4, $5, $6) returning *";
    const pgRes = await pgClient.query(queryText, [
      req.body.first_name,
      req.body.last_name,
      req.body.email,
      req.body.user_name,
      req.body.user_password,
      req.body.phone_no,
    ]);
    res.json({
      rows: pgRes.rows,
      count: pgRes.rowCount,
    });
  } else {
    return next({
      status: 400,
      message: "user already exits, check the email and user_name",
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
    "select * from account_users au where email = $1 or user_name = $2";
  const searchPgRes = await pgClient.query(searchQuery, [
    req.body.email,
    req.body.user_name,
  ]);

  if (searchPgRes.rowCount == 0) {
    const queryText =
      "update account_users set first_name  = $1, last_name=$2, email=$3, user_name=$4, user_password=$5, phone_no=$6 where id = $7  returning *";
    const pgRes = await pgClient.query(queryText, [
      req.body.first_name || userToUpdate.first_name,
      req.body.last_name || userToUpdate.last_name,
      req.body.email || userToUpdate.email,
      req.body.user_name || userToUpdate.user_name,
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
      message: "user already exits, check the email and user_name",
    });
  }
};

// login
const loginController = async (req, res, next) => {
  const queryText =
    "select * from account_users au where email = $1 and user_password =$2";
  const pgRes = await pgClient.query(queryText, [
    req.body.email,
    req.body.user_password,
  ]);

  if (pgRes.rowCount == 0) {
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
