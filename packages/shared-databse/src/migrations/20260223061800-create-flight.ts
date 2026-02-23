"use strict";

import { DataTypes, QueryInterface } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface: QueryInterface) {
		await queryInterface.createTable("Flights", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER,
			},
			aircraft_id: {
				type: DataTypes.UUID,
			},
			airpot_id: {
				type: DataTypes.UUID,
			},
			flight_number: { type: DataTypes.STRING, allowNull: false },
			flight_model: {
				type: DataTypes.STRING,
			},
			departure_date: { type: DataTypes.DATEONLY },
			departure_time: { type: DataTypes.TIME },
			arrival_time: { type: DataTypes.TIME },
			status: {
				type: DataTypes.ENUM("Scheduled", "Delayed", "Cancelled", "Completed"),
				defaultValue: "Scheduled",
			},
			created_at: {
				allowNull: false,
				type: DataTypes.DATE,
			},
			updated_at: {
				allowNull: false,
				type: DataTypes.DATE,
			},
		});
	},
	async down(queryInterface: QueryInterface) {
		await queryInterface.dropTable("Flights");
	},
};
