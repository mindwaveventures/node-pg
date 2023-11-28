module.exports = function model(sequelize, types) {
  const favourites = sequelize.define(
    "rating",
    {
      rating_id: {
        type: types.UUID,
        defaultValue: types.UUIDV4,
        primarykey: true,
        unique: true,
      },
      user_id: {
        type: types.UUID,
        references: {
          model: {
            tableName: "users",
          },
          key: "user_id",
        },
        allowNull: false,
        onDelete: "CASCADE",
      },
      item_id: {
        type: types.UUID,
        references: {
          model: {
            tableName: "items",
          },
          key: "item_id",
        },
        allowNull: false,
        onDelete: "CASCADE",
      },
      rating: {
        type: types.INTEGER,
      },
    },
    {
      tableName: "rating",
      // defaultScope: {
      //     where: {
      //         status: 'Active'
      //     }
      // }
    }
  );

  favourites.associate = function (models) {
    favourites.belongsTo(models.items, {
      as: "favourite_items",
      foreignKey: "item_id",
      sourceKey: "item_id",
    }),
      favourites.belongsTo(models.users, {
        as: "favourite_items_user",
        foreignKey: "user_id",
        sourceKey: "user_id",
      });
  };

  return favourites;
};
