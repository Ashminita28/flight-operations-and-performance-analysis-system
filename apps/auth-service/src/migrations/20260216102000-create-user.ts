"use strict";

import { DataTypes, QueryInterface } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
export default {
	async up(queryInterface: QueryInterface) {
		await queryInterface.createTable("Users", {
			id: {
				type: DataTypes.UUID,
				primaryKey: true,
				allowNull: false,
				defaultValue: DataTypes.UUIDV4,
			},
			name: {
				type: DataTypes.STRING,
			},
			email: {
				allowNull: false,
				unique: true,
				type: DataTypes.STRING,
			},
			phone: {
				type: DataTypes.STRING,
				unique: true,
			},

			password: { type: DataTypes.STRING },
			status: {
				type: DataTypes.ENUM,
				values: ["inactive", "active", "suspended"],
				defaultValue: "inactive",
			},
			refreshToken: { type: DataTypes.STRING },
			createdAt: {
				allowNull: false,
				type: DataTypes.DATE,
				defaultValue: DataTypes.NOW,
			},
			updatedAt: {
				allowNull: false,
				type: DataTypes.DATE,
				defaultValue: DataTypes.NOW,
			},
		});
	},
	async down(queryInterface: QueryInterface) {
		await queryInterface.dropTable("Users");
	},
};
