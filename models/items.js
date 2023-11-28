// const { DataTypes } = require("sequelize");

module.exports = function model(sequelize, types) {
  const Items = sequelize.define(
    "items",
    {
      item_id: {
        type: types.UUID,
        defaultValue: types.UUIDV4,
        primarykey: true,
        unique: true,
      },
      item_name: {
        type: types.STRING,
        allowNull: false,
      },
      item_content: {
        type: types.STRING,
        allowNull: false,
      },
      item_price: {
        type: types.DECIMAL(10, 2),
        allowNull: false,
      },
    },

    {
      tableName: "items",
    }
  );

  //   Users.associate = function (models) {
  //     Users.hasMany(models.posts, {
  //       as: "",
  //       foreignKey: "userId",
  //       sourceKey: "user_id",
  //     });
  //   };

  return Items;
};
// item_id SERIAL PRIMARY KEY,
//     item_name VARCHAR not null,
//     item_content VARCHAR,
//     price DECIMAL(10, 2) not null,
//     item_count integer not null
