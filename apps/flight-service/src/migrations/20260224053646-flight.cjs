"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Flights", {
			id: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.UUID,
			},
			aircraft_id: {
				type: Sequelize.UUID,
			},
			departure_airport: {
				type: Sequelize.STRING,
			},
			arrival_airport: {
				type: Sequelize.STRING,
			},
			flight_number: { type: Sequelize.STRING, allowNull: false },
			departure_date: { type: Sequelize.DATEONLY },
			departure_datetime: { type: Sequelize.TIME },
			arrival_datetime: { type: Sequelize.TIME },
			status: {
				type: Sequelize.ENUM("Scheduled", "Delayed", "Cancelled", "Completed"),
				defaultValue: "Scheduled",
			},
			created_at: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updated_at: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("Flights");
	},
};
