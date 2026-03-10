"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("analytics_summary", {
			id: {
				type: Sequelize.UUID,
				allowNull: false,
				primaryKey: true,
				defaultValue: Sequelize.UUIDV4,
			},
			date: {
				type: Sequelize.DATEONLY,
				allowNull: false,
			},
			origin_airport: {
				type: Sequelize.STRING(10),
				allowNull: false,
			},
			destination_airport: {
				type: Sequelize.STRING,
			},
			delay_category: {
				type: Sequelize.STRING,
			},
			aircraft_id: {
				type: Sequelize.UUID,
				allowNull: false,
			},
			total_flights: {
				type: Sequelize.INTEGER,
				defaultValue: 0,
			},
			delayed_flights: {
				type: Sequelize.INTEGER,
				defaultValue: 0,
			},
			avg_delay_minutes: {
				type: Sequelize.FLOAT,
				defaultValue: 0,
			},
			total_flight_hours: {
				type: Sequelize.FLOAT,
				defaultValue: 0,
			},
			avg_fuel_efficiency: {
				type: Sequelize.DECIMAL,
				allowNull: false,
			},
			avg_load_factor_pct: {
				type: Sequelize.FLOAT,
			},
			createdAt: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.NOW,
			},
			updatedAt: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.NOW,
			},
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("analytics_summary");
	},
};
