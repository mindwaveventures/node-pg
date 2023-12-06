<<<<<<< HEAD
<<<<<<< HEAD
const helper = require("../services/helper");

=======
const { DataTypes } = require("sequelize");
const helper = require("../services/helper");
>>>>>>> origin/priyavarshini-sequelize
=======
const helper = require("../services/helper");
const bcrypt = require("bcryptjs");

>>>>>>> origin/karthickeyan-node-sequalize
module.exports = function model(sequelize, types) {
  const Users = sequelize.define(
    "users",
    {
<<<<<<< HEAD
<<<<<<< HEAD
=======
      //         uuid: {
      //             type: types.UUID,
      //             defaultValue: types.UUIDV4,
      //             primarykey: true,
      //             unique: true,
      //         },
      //         name: {
      //             type: types.STRING,
      //             defaultValue: ''
      //         },
      //         status: {
      //             type: types.STRING,
      //             defaultValue: 'Active'
      //         },
      //     }, {
      //         tableName: 'users',
      //         // defaultScope: {
      //         //     where: {
      //         //         status: 'Active'
      //         //     }
      //         // }

>>>>>>> origin/priyavarshini-sequelize
=======
>>>>>>> origin/karthickeyan-node-sequalize
      user_id: {
        type: types.UUID,
        defaultValue: types.UUIDV4,
        primarykey: true,
        unique: true,
      },
      first_name: {
        type: types.STRING,
<<<<<<< HEAD
<<<<<<< HEAD
        defaultValue: "",
=======
        allowNull: false,
>>>>>>> origin/priyavarshini-sequelize
=======
        defaultValue: "",
>>>>>>> origin/karthickeyan-node-sequalize
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
<<<<<<< HEAD
<<<<<<< HEAD
        defaultValue: "",
      },
      token: {
        type: types.STRING,
=======
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
=======
        defaultValue: "",
>>>>>>> origin/karthickeyan-node-sequalize
      },
      token: {
        type: DataTypes.TEXT,
        allowNull: true,
>>>>>>> origin/priyavarshini-sequelize
        defaultValue: "",
      },
    },
    {
      tableName: "users",
<<<<<<< HEAD
      // defaultScope: {
      //     where: {
      //         status: 'Active'
      //     }
      // }
    }
  );
=======
      timestamps: false,
      // defaultScope: {
      //     where: {
      //         status: 'Active'
      //     }
      // }
    }
  );

>>>>>>> origin/priyavarshini-sequelize
  Users.beforeCreate(async (user) => {
    try {
      if (user.user_password) {
        user.user_password = await helper.hashPassword(user.user_password);
      }
    } catch (error) {
      console.log("\n save password hash error...", error);
    }
  });
<<<<<<< HEAD
  Users.addHook("beforeUpdate", async (user) => {
    try {
<<<<<<< HEAD
      if (user.changed("user_password") && user.user_password) {
=======
      if (user.user_password) {
>>>>>>> origin/karthickeyan-node-sequalize
        user.user_password = await helper.hashPassword(user.user_password);
      }
    } catch (error) {
      console.log("\n update password hash error...", error);
    }
  });

<<<<<<< HEAD
  // Users.associate = function (models) {
  //   Users.hasMany(models.posts, {
  //     as: "posts",
  //     foreignKey: "userId",
  //     sourceKey: "uuid",
  //   });
  // };

=======
  // Users.addHook("beforeUpdate", async (user) => {
  //   try {
  //     if (user.changed("user.user_password") && user.user_password) {
  //       // user.user_password = await commonService.hashPassword(
  //       //   user.user_password
  //       // );
  //       user.user_password = await helper.hashPassword(user.user_password);
  //     }
  //   } catch (error) {
  //     console.log("\n update password hash error...", error);
  //   }
  // });

  Users.addHook("beforeUpdate", async (user) => {
    console.log("Update user", user);
    try {
      if (user.changed("user_password") && user.user_password) {
        user.user_password = await helper.hashPassword(user.user_password);
        console.log("Update user password", user.user_password);
      }
    } catch (error) {
      console.log("\n Update user_password hash error:", error);
    }
  });

  Users.associate = function (models) {
    Users.hasMany(models.rating, {
      as: "rating",
      foreignKey: "user_id",
      sourceKey: "user_id",
    });
  };

>>>>>>> origin/priyavarshini-sequelize
=======
>>>>>>> origin/karthickeyan-node-sequalize
  return Users;
};
