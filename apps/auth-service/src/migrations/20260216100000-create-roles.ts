"use strict";

import { DataTypes, QueryInterface } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
export default {
	async up(queryInterface: QueryInterface) {
		await queryInterface.createTable("Roles", {
			id: {
				type: DataTypes.UUID,
				primaryKey: true,
				allowNull: false,
				defaultValue: DataTypes.UUIDV4,
			},
			name: {
				allowNull: false,
				type: DataTypes.STRING,
				unique: true,
			},
			createdAt: {
				allowNull: false,
				type: DataTypes.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: DataTypes.DATE,
			},
		});
	},

	async down(queryInterface: QueryInterface) {
		await queryInterface.dropTable("Roles");
	},
};
