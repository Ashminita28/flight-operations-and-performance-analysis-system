"use strict";

const crypto = require("crypto");

module.exports = {
	async up(queryInterface) {
		const roles = await queryInterface.sequelize.query(
			`SELECT id,name FROM "Roles"`,
			{ type: queryInterface.sequelize.QueryTypes.SELECT },
		);

		const permissions = await queryInterface.sequelize.query(
			`SELECT id,name FROM "Permissions"`,
			{ type: queryInterface.sequelize.QueryTypes.SELECT },
		);

		const getRoleId = name => roles.find(r => r.name === name).id;

		const getPermissionId = name => permissions.find(p => p.name === name).id;

		await queryInterface.bulkInsert("RolePermissions", [
			/* ADMIN */

			{
				id: crypto.randomUUID(),
				role_id: getRoleId("Admin"),
				permission_id: getPermissionId("manage-users"),
				created_at: new Date(),
				updated_at: new Date(),
			},

			{
				id: crypto.randomUUID(),
				role_id: getRoleId("Admin"),
				permission_id: getPermissionId("view-dashboard"),
				created_at: new Date(),
				updated_at: new Date(),
			},

			/* OPERATIONS */

			{
				id: crypto.randomUUID(),
				role_id: getRoleId("Operations"),
				permission_id: getPermissionId("create-aircraft"),
				created_at: new Date(),
				updated_at: new Date(),
			},

			{
				id: crypto.randomUUID(),
				role_id: getRoleId("Operations"),
				permission_id: getPermissionId("create-flight"),
				created_at: new Date(),
				updated_at: new Date(),
			},

			{
				id: crypto.randomUUID(),
				role_id: getRoleId("Operations"),
				permission_id: getPermissionId("update-flight"),
				created_at: new Date(),
				updated_at: new Date(),
			},

			/* MANAGER */

			{
				id: crypto.randomUUID(),
				role_id: getRoleId("Manager"),
				permission_id: getPermissionId("view-dashboard"),
				created_at: new Date(),
				updated_at: new Date(),
			},

			{
				id: crypto.randomUUID(),
				role_id: getRoleId("Manager"),
				permission_id: getPermissionId("view-flights"),
				created_at: new Date(),
				updated_at: new Date(),
			},
		]);
	},

	async down(queryInterface) {
		await queryInterface.bulkDelete("RolePermissions", null, {});
	},
};
