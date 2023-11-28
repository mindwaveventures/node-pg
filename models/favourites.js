module.exports = function model(sequelize, types) {
  const favourites = sequelize.define(
    "favourites",
    {
      fav_id: {
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
    },
    {
      tableName: "favourites",
      // defaultScope: {
      //     where: {
      //         status: 'Active'
      //     }
      // }
    }
  );

  favourites.associate = function (models) {
    favourites.hasMany(models.items, {
      as: "favourite_items",
      foreignKey: "item_id",
      sourceKey: "item_id",
    }),
      favourites.hasMany(models.users, {
        as: "favourite_items_user",
        foreignKey: "user_id",
        sourceKey: "user_id",
      });
  };

  return favourites;
};
