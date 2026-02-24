"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("FlightCrews", {
			id: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.UUID,
			},
			flight_id: {
				type: Sequelize.UUID,
			},
			crew_id: {
				type: Sequelize.UUID,
			},
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("FlightCrews");
	},
};
