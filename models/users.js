const { DataTypes } = require("sequelize");

module.exports = function model(sequelize, types) {
  const Users = sequelize.define(
    "users",
    {
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

      user_id: {
        type: types.UUID,
        defaultValue: types.UUIDV4,
        primarykey: true,
        unique: true,
      },
      first_name: {
        type: types.STRING,
        allowNull: false,
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
      },
      user_password: {
        type: types.STRING,
        allowNull: false,
      },
      phone_no: {
        type: types.STRING,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "users",
      timestamps: false,
    }
  );

  Users.associate = function (models) {
    Users.hasMany(models.rating, {
      as: "rating",
      foreignKey: "user_id",
      sourceKey: "user_id",
    });
  };

  return Users;
};
