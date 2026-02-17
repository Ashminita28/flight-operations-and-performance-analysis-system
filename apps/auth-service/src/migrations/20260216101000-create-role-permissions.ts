"use strict";

import { DataTypes, QueryInterface } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
export default {
	async up(queryInterface: QueryInterface) {
		await queryInterface.createTable("role_permissions", {
			roleId: {
				type: DataTypes.UUID,
			},
			permissionId: {
				type: DataTypes.UUID,
			},
		});
	},

	async down(queryInterface: QueryInterface) {
		await queryInterface.dropTable("role_permissions");
	},
};
