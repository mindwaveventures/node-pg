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
        allowNull: false,
        unique: true,
      },
      email: {
        type: types.STRING,
        allowNull: false,
        unique: true,
      },
      user_password: {
        type: types.STRING,
        allowNull: false,
      },
      phone_no: {
        type: types.STRING,
        defaultValue: "",
      },
    },
    {
      tableName: "users",
    }
  );

  Users.beforeCreate(async (user) => {
    try {
      if (user.password) {
        user.password = await helper.hashPassword(user.password);
      }
    } catch (error) {
      console.log("\n save password hash error...", error);
    }
  });
  Users.addHook("beforeUpdate", async (user) => {
    try {
      if (user.changed("password") && user.password) {
        user.password = await commonService.hashPassword(user.password);
      }
    } catch (error) {
      console.log("\n update password hash error...", error);
    }
  });

  Users.associate = function (models) {
    Users.hasMany(models.carts, {
      as: "carts",
      foreignKey: "user_id",
      sourceKey: "user_id",
    });
    Users.hasMany(models.purchases, {
      as: "purchases",
      foreignKey: "user_id",
      sourceKey: "user_id",
    });
    Users.hasMany(models.favourites, {
      as: "favourites",
      foreignKey: "user_id",
      sourceKey: "user_id",
    });
    Users.hasMany(models.ratings, {
      as: "ratings",
      foreignKey: "user_id",
      sourceKey: "user_id",
    });
  };

  return Users;
};
