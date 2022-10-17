'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.addColumn('fixtures', 'score', {
			type: Sequelize.TEXT,
			defaultValue: []
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.removeColumn('fixtures', 'score');
	}
};
