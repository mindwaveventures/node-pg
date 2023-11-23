const pgClient = require("../pg-config");

async function loginController(req, res) {
  const queryText =
    "select * from account_users au where email = $1 and user_password =$2";
  const pgRes = await pgClient.query(queryText, [
    req.body.email,
    req.body.user_password,
  ]);

  res.json({
    rows: pgRes.rows,
    count: pgRes.rowCount,
  });
}
async function getAccountController(req, res) {
  const queryText = "select * from account_users au where id = $1";
  const pgRes = await pgClient.query(queryText, [req.params.id]);

  res.json({
    rows: pgRes.rows,
    count: pgRes.rowCount,
  });
}
module.exports = {
  loginController,
  getAccountController,
};
