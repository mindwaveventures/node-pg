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
      timestamps: false,
    }
  );

  favourites.associate = function (models) {
    favourites.belongsTo(models.items, {
      as: "favourites",
      foreignKey: "item_id",
      targetKey: "item_id",
    }),
      favourites.belongsTo(models.users, {
        as: "favourite_items_user",
        foreignKey: "user_id",
        targetKey: "user_id",
      });
  };

  return favourites;
};
