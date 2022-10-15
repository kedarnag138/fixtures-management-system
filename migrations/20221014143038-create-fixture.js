'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Fixtures', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      homeTeamId: {
        type: Sequelize.INTEGER
      },
      awayTeamId: {
        type: Sequelize.INTEGER
      },
      date: {
        type: Sequelize.STRING
      },
      time: {
        type: Sequelize.STRING
      },
      referee: {
        type: Sequelize.STRING
      },
      matchStatus: {
        type: Sequelize.STRING
      },
      venue: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Fixtures');
  }
};