"use strict";

const crypto = require("crypto");

module.exports = {
	async up(queryInterface) {
		const user = await queryInterface.sequelize.query(
			`SELECT id FROM users WHERE email='ashminita_aviation@gmail.com'`,
			{ type: queryInterface.sequelize.QueryTypes.SELECT },
		);

		const role = await queryInterface.sequelize.query(
			`SELECT id FROM roles WHERE name='Admin'`,
			{ type: queryInterface.sequelize.QueryTypes.SELECT },
		);

		await queryInterface.bulkInsert("user_roles", [
			{
				user_id: user[0].id,
				role_id: role[0].id,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	async down(queryInterface) {
		await queryInterface.bulkDelete("user_roles", null, {});
	},
};
