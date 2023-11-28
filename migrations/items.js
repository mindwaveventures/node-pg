"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("items", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true,
      },
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
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("items");
  },
};

// CREATE TABLE items (
//     item_id SERIAL PRIMARY KEY,
//     item_name VARCHAR not null,
//     item_content VARCHAR,
//     price DECIMAL(10, 2) not null,
//     item_count integer not null
// );
