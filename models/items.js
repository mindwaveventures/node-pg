// const { DataTypes } = require("sequelize");

const rating = require("./rating");

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

  rating.associate = function (models) {
    Users.hasMany(models.rating, {
      as: "rating",
      foreignKey: "user_id",
      sourceKey: "user_id",
    });
  };

  return Items;
};
// item_id SERIAL PRIMARY KEY,
//     item_name VARCHAR not null,
//     item_content VARCHAR,
//     price DECIMAL(10, 2) not null,
//     item_count integer not null
