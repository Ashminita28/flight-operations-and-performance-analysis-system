"use strict";

import { DataTypes, QueryInterface } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
export default {
	async up(queryInterface: QueryInterface) {
		await queryInterface.createTable("password_reset", {
			id: {
				type: DataTypes.UUID,
				primaryKey: true,
				defaultValue: DataTypes.UUIDV4,
			},
			email: { type: DataTypes.UUID },
			otp: { type: DataTypes.UUID },
			expiresAt: { type: DataTypes.UUID },
		});
	},

	async down(queryInterface: QueryInterface) {
		await queryInterface.dropTable("password_reset");
	},
};
