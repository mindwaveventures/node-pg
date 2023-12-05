const express = require("express");
const app = express();
const bodyParser = require("body-parser");

// router
const Router = require("./routes/users.routes");
const itemRouter = require("./routes/items.routes");
const ratingRouter = require("./routes/rating.routes");

const config = require("./config/config");
// const pgClient = require('./pg-config');
const { sequelize, models, Sequelize } = require("./config/sequelize-config");
const Op = Sequelize.Op;

// create application/json parser
const jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(jsonParser);
app.use(urlencodedParser);
app.use("/", Router);
app.use("/", itemRouter);
app.use("/", ratingRouter);

app.post("/save-user", async function (req, res) {
  const usersCreate = await models.users.create({
    name: req.body.name,
  });

  res.json({
    usersCreate,
  });
});

app.patch("/update-user", async function (req, res) {
  const usersUpdate = await models.users.update(
    {
      name: req.body.name,
    },
    {
      where: {
        uuid: req.body.userid,
      },
      returning: true,
    }
  );

  res.json({
    usersUpdate,
  });
});

app.get("/", async function (req, res) {
  try {
    const usersFind = await models.users.findAndCountAll({
      attributes: ["name"],
      where: {
        name: {
          [Op.iLike]: `%${req.query.name}`,
        },
      },
      logging: true,
      include: [
        {
          model: models.posts,
          as: "posts",
          required: false,
          where: {
            content: {
              [Op.not]: null,
            },
          },
        },
      ],
    });
    return res.json({
      usersFind,
    });
  } catch (error) {
    console.log("\n error...", error);
    return res.send(error);
  }
});

// app.delete("/remove", async function (req, res) {
//   const pgRes = await pgClient.query(
//     "DELETE from users where userid=$1 RETURNING userid",
//     [req.query.userid]
//   );

//   res.json({
//     rows: pgRes.rows,
//     count: pgRes.rowCount,
//   });
// });

app.listen(config.port, config.host, () => {
  console.log(`Server running at http://${config.host}:${config.port}/`);
});
