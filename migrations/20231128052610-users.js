"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("users", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primarykey: true,
        unique: true,
      },
      first_name: {
        type: Sequelize.STRING,
        defaultValue: "",
      },
      last_name: {
        type: Sequelize.STRING,
        defaultValue: "",
      },
      user_name: {
        type: Sequelize.STRING,
        defaultValue: "",
      },
      email: {
        type: Sequelize.STRING,
        defaultValue: "",
      },
      user_password: {
        type: Sequelize.STRING,
        defaultValue: "",
      },
      phone_no: {
        type: Sequelize.INTEGER,
        defaultValue: "",
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("users");
  },
};

// create table account_users (
// 	id SERIAL primary key,
// 	first_name VARCHAR not null,
// 	last_name VARCHAR ,
// 	user_name VARCHAR not null unique,
// 	email VARCHAR not null,
// 	user_password VARCHAR not null,
// 	phone_no VARCHAR,
// 	created_at TIMESTAMP default current_timestamp
// )
