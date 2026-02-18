"use strict";

import { DataTypes, QueryInterface } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
export default {
	async up(queryInterface: QueryInterface) {
		await queryInterface.createTable("role_permissions", {
			id: {
				allowNull: false,
				primaryKey: true,
				type: DataTypes.UUID,
			},
			role_id: {
				type: DataTypes.UUID,
				allowNull: false,
			},
			permission_id: {
				type: DataTypes.UUID,
				allowNull: false,
			},
		});
	},

	async down(queryInterface: QueryInterface) {
		await queryInterface.dropTable("role_permissions");
	},
};
