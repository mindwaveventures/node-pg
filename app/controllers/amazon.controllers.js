const pgClient = require("../pg-config");

async function loginController(req, res) {
  const queryText =
    "select * from account_users au where email = $1 and user_password =$2";
  const pgRes = await pgClient.query(queryText, [
    req.body.email,
    req.body.user_password,
  ]);

  //   const postQueryText =
  //     "INSERT INTO posts(postcontent,userid) VALUES($1,$2) RETURNING postid";
  //   const postPgRes = await pgClient.query(postQueryText, [
  //     req.body.postcontent,
  //     pgRes.rows[0].userid,
  //   ]);

  res.json({
    rows: pgRes.rows,
    count: pgRes.rowCount,
    // postInsert: postPgRes.rows,
  });
}
module.exports = {
  loginController,
};
