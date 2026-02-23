"use strict";

import { DataTypes, QueryInterface } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface: QueryInterface) {
		await queryInterface.createTable("PasswordResets", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.UUID,
			},
			user_id: {
				type: DataTypes.UUID,
				allowNull: false,
			},
			token: {
				type: DataTypes.STRING,
			},
			expires_at: {
				type: DataTypes.DATE,
			},
			is_used: {
				type: DataTypes.BOOLEAN,
				defaultValue: false,
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
		await queryInterface.dropTable("PasswordResets");
	},
};
