"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("purchases", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      purchase_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primarykey: true,
        unique: true,
      },
      user_id: {
        type: Sequelize.UUID,
        references: {
          model: {
            tableName: "users",
          },
          key: "user_id",
        },
        allowNull: false,
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      item_id: {
        type: Sequelize.UUID,
        references: {
          model: {
            tableName: "items",
          },
          key: "item_id",
        },
        allowNull: false,
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      date_of_order: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      order_status: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("purchases");
  },
};
