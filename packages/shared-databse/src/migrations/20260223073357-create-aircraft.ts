"use strict";

import { DataTypes, QueryInterface } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface: QueryInterface) {
		await queryInterface.createTable("Aircraft", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER,
			},
			aircraft_model: {
				type: DataTypes.STRING,
			},
			maintenance_status: {
				type: DataTypes.STRING,
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
		await queryInterface.dropTable("Aircraft");
	},
};
