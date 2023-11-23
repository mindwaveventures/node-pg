const pgClient = require("../pg-config");
const Joi = require("joi");

//get Users for checking purpose
const getUsers = async (req, res) => {
  const pgRes = await pgClient.query("select * from account_users au");

  res.json({
    rows: pgRes.rows,
    count: pgRes.rowCount,
  });
};

module.exports = {
  addUserController,
  getUsers,
};
