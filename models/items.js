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
      // defaultScope: {
      //     where: {
      //         status: 'Active'
      //     }
      // }
    }
  );

  return Items;
};
