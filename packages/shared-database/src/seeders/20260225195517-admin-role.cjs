"use strict";

const crypto = require("crypto");

module.exports = {
	async up(queryInterface) {
		const user = await queryInterface.sequelize.query(
			`SELECT id FROM "Users" WHERE email='admin@aviation.com'`,
			{ type: queryInterface.sequelize.QueryTypes.SELECT },
		);

		const role = await queryInterface.sequelize.query(
			`SELECT id FROM "Roles" WHERE name='Admin'`,
			{ type: queryInterface.sequelize.QueryTypes.SELECT },
		);

		await queryInterface.bulkInsert("UserRoles", [
			{
				id: crypto.randomUUID(),
				user_id: user[0].id,
				role_id: role[0].id,
				created_at: new Date(),
				updated_at: new Date(),
			},
		]);
	},

	async down(queryInterface) {
		await queryInterface.bulkDelete("UserRoles", null, {});
	},
};
