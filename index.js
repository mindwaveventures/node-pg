const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const config = require("./config/config");
// const pgClient = require('./pg-config');
const { sequelize, models, Sequelize } = require("./config/sequelize-config");
const helper = require("./services/helper");
const { isAuthorised } = require("./middleware/middleware");
const Op = Sequelize.Op;

// create application/json parser
const jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(jsonParser);
app.use(urlencodedParser);
app.use(cors());

const itemRouter = require("./routes/items.routes");
const userRouter = require("./routes/user.routes");
app.post("/save-user", async function (req, res) {
  const usersCreate = await models.users.create({
    name: req.body.name,
    username: req.body.username,
    password: req.body.password,
  });
});

app.use("/", itemRouter);
// app.use("/", userRouter);

// app.post("/add-items", async function (req, res) {
//   const itemsCreate = await models.items.create({
//     item_name: req.body.item_name,
//     item_content: req.body.item_content,
//     price: req.body.price,
//     item_count: req.body.item_count,
//   });

//   res.json({
//     itemsCreate,
//   });
// });

// app.patch("/update-user", async function (req, res) {
//   const usersUpdate = await models.users.update(
//     {
//       name: req.body.name,
//     },
//     {
//       where: {
//         uuid: req.body.userid,
//       },
//       returning: true,
//     }
//   );

// sign up

app.post("/signup", async function (req, res) {
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
});

// app.post("/login", async function (req, res) {
//   try {
//     const usersFind = await models.users.findOne({
//       where: {
//         username: req.body.username,
//       },
//       logging: true,
//     });

//     const passwordMatch = await helper.comparePassword(
//       req.body.password,
//       usersFind.password
//     );

//     if (passwordMatch) {
//       const payload = {
//         uuid: usersFind.uuid,
//         name: usersFind.name,
//         username: usersFind.username,
//       };
//       const token = jwt.sign(payload, config.jwtSecret, { expiresIn: "1h" });
//       return res.json({
//         token,
//       });
//     }
//     return res.status(403).send("Not valid");
//   } catch (error) {
//     console.log("\n error...", error);
//     return res.send(error);
//   }
// });
// login
app.post("/login", async function (req, res) {
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
});

app.get("/get-account", isAuthorised, async function (req, res) {
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
});

app.get("/", isAuthorised, async function (req, res) {
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
    res.send(error);
  }
});

//   res.json({
//     usersUpdate,
//   });
// });

// app.get("/", async function (req, res) {
//   try {
//     const usersFind = await models.users.findAndCountAll({
//       attributes: ["name"],
//       where: {
//         name: {
//           [Op.iLike]: `%${req.query.name}`,
//         },
//       },
//       logging: true,
//       include: [
//         {
//           model: models.posts,
//           as: "posts",
//           required: false,
//           where: {
//             content: {
//               [Op.not]: null,
//             },
//           },
//         },
//       ],
//     });
//     return res.json({
//       usersFind,
//     });
//   } catch (error) {
//     console.log("\n error...", error);
//     return res.send(error);
//   }
// });

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
