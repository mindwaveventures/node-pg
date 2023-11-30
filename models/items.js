module.exports = function model(sequelize, types) {
  const items = sequelize.define(
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
        defaultValue: "",
      },
      item_price: {
        type: types.DECIMAL(10, 2),
        allowNull: false,
      },
      item_count: {
        type: types.INTEGER,
        defaultValue: 0,
      },
    },

    {
      tableName: "items",
    }
  );

  Users.associate = function (models) {
    Users.hasMany(models.favourites, {
      as: "favourites",
      foreignKey: "user_id",
      sourceKey: "uuid",
    });
  };

  return items;
};
