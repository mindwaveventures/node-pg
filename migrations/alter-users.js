module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("users", "token", {
      type: Sequelize.TEXT,
      allowNull: true,
      unique: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("users", "token");
  },
};
