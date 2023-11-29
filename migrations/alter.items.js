module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn("items", "createdAt", {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      }),
      queryInterface.addColumn("items", "updatedAt", {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      }),
    ]);
  },

  down: (queryInterface) => {
    return Promise.all([
      queryInterface.removeColumn("items", "createdAt"),
      queryInterface.removeColumn("items", "updatedAt"),
    ]);
  },
};
