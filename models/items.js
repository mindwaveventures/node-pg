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
        defaultValue: "",
      },
      item_content: {
        type: types.STRING,
        defaultValue: "",
      },
      price: {
        type: types.DECIMAL(10, 2),
        defaultValue: 0,
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
  items.associate = function (models) {
    items.hasMany(models.favourites, {
      foreignKey: "item_id",
      sourceKey: "item_id",
    });
  };

  return items;
};
