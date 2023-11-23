const pgClient = require("../pg-config");
const Joi = require("joi");

//get Users for checking
const getUsers = async (req, res) => {
  const pgRes = await pgClient.query("select * from account_users au");

  res.json({
    rows: pgRes.rows,
    count: pgRes.rowCount,
  });
};

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

module.exports = {
  addUserController,
  getUsers,
};
