"use strict";

const crypto = require("crypto");

module.exports = {
	async up(queryInterface) {
		const roles = await queryInterface.sequelize.query(
			`SELECT id,name FROM roles`,
			{ type: queryInterface.sequelize.QueryTypes.SELECT },
		);

		const permissions = await queryInterface.sequelize.query(
			`SELECT id,name FROM permissions`,
			{ type: queryInterface.sequelize.QueryTypes.SELECT },
		);

		const getRoleId = name => roles.find(r => r.name === name).id;

		const getPermissionId = name => permissions.find(p => p.name === name).id;

		await queryInterface.bulkInsert("role_permissions", [
			/* ADMIN */

			{
				id: crypto.randomUUID(),
				role_id: getRoleId("Admin"),
				permission_id: getPermissionId("manage-users"),
				createdAt: new Date(),
				updatedAt: new Date(),
			},

			{
				id: crypto.randomUUID(),
				role_id: getRoleId("Admin"),
				permission_id: getPermissionId("view-dashboard"),
				createdAt: new Date(),
				updatedAt: new Date(),
			},

			/* OPERATIONS */

			{
				id: crypto.randomUUID(),
				role_id: getRoleId("Operations"),
				permission_id: getPermissionId("create-aircraft"),
				createdAt: new Date(),
				updatedAt: new Date(),
			},

			{
				id: crypto.randomUUID(),
				role_id: getRoleId("Operations"),
				permission_id: getPermissionId("create-flight"),
				createdAt: new Date(),
				updatedAt: new Date(),
			},

			{
				id: crypto.randomUUID(),
				role_id: getRoleId("Operations"),
				permission_id: getPermissionId("update-flight"),
				createdAt: new Date(),
				updatedAt: new Date(),
			},

			/* MANAGER */

			{
				id: crypto.randomUUID(),
				role_id: getRoleId("Manager"),
				permission_id: getPermissionId("view-dashboard"),
				createdAt: new Date(),
				updatedAt: new Date(),
			},

			{
				id: crypto.randomUUID(),
				role_id: getRoleId("Manager"),
				permission_id: getPermissionId("view-flights"),
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	async down(queryInterface) {
		await queryInterface.bulkDelete("role_permissions", null, {});
	},
};
