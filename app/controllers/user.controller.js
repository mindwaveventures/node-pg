const pgClient = require("../pg-config");
const Joi = require("joi");

//creating new user account
const addUserController = async (req, res, next) => {
  const searchQuery =
    "select * from account_users au where email = $1 or username = $2";
  const searchPgRes = await pgClient.query(searchQuery, [
    req.body.email,
    req.body.username,
  ]);

  if (searchPgRes.rowCount == 0) {
    const queryText =
      "INSERT INTO account_users(first_name, last_name, email, username, user_password, phone_no) VALUES($1,$2,$3,$4, $5, $6) returning *";
    const pgRes = await pgClient.query(queryText, [
      req.body.first_name,
      req.body.last_name,
      req.body.email,
      req.body.username,
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
      "update account_users set first_name  = $1, last_name=$2, email=$3, username=$4, user_password=$5, phone_no=$6 where id = 3  returning *";
    const pgRes = await pgClient.query(queryText, [
      req.body.first_name || userToUpdate.first_name,
      req.body.last_name || userToUpdate.last_name,
      req.body.email || userToUpdate.email,
      req.body.username || userToUpdate.username,
      req.body.user_password || userToUpdate.user_password,
      req.body.phone_no || userToUpdate.phone_no,
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

module.exports = {
  addUserController,
  updateUserController,
};
