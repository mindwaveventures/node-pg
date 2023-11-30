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

  Users.associate = function (models) {
    Users.hasMany(models.carts, {
      as: "carts",
      foreignKey: "user_id",
      sourceKey: "user_id",
    });
    // Users.hasMany(models.purchases, {
    //   as: "purchases",
    //   foreignKey: "user_id",
    //   sourceKey: "uuid",
    // });
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
