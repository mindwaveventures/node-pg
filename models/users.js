const helper = require("../services/helper");
const bcrypt = require("bcryptjs");

module.exports = function model(sequelize, types) {
  const Users = sequelize.define(
    "users",
    {
      user_id: {
        type: types.UUID,
        defaultValue: types.UUIDV4,
        primarykey: true,
        unique: true,
      },
      first_name: {
        type: types.STRING,
        defaultValue: "",
      },
      last_name: {
        type: types.STRING,
        defaultValue: "",
      },
      user_name: {
        type: types.STRING,
        defaultValue: "",
      },
      email: {
        type: types.STRING,
        defaultValue: "",
      },
      user_password: {
        type: types.STRING,
        defaultValue: "",
      },
      phone_no: {
        type: types.STRING,
        defaultValue: "",
      },
    },
    {
      tableName: "users",
      timestamps: false,
      // defaultScope: {
      //     where: {
      //         status: 'Active'
      //     }
      // }
    }
  );

  Users.beforeCreate(async (user) => {
    try {
      if (user.user_password) {
        user.user_password = await helper.hashPassword(user.user_password);
      }
    } catch (error) {
      console.log("\n save password hash error...", error);
    }
  });
  Users.addHook("beforeUpdate", async (user) => {
    try {
      if (user.user_password) {
        user.user_password = await helper.hashPassword(user.user_password);
      }
    } catch (error) {
      console.log("\n update password hash error...", error);
    }
  });

  return Users;
};
