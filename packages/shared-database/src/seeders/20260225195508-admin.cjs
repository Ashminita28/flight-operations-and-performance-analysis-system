"use strict";

const bcrypt = require("bcrypt");
const crypto = require("crypto");

module.exports = {
	async up(queryInterface, Sequelize) {
		const roles = await queryInterface.sequelize.query(
			`SELECT id FROM roles WHERE name='Admin'`,
		);
		const roleId = roles[0][0].id;
		const id = crypto.randomUUID();

		await queryInterface.bulkInsert("users", [
			{
				id: id,
				first_name: "Ashminita",
				last_name: "Baliarsingh",
				email: "ashminita_aviation@gmail.com",
				phone: "9999999999",
				password:
					"$2a$12$9.CPDWluPkujpu5Ic8bvGOTfNQ2gSJUrxHdXC5SdzQfWcmySqknFO",
				status: "active",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	async down(queryInterface) {
		await queryInterface.bulkDelete("users", null, {});
	},
};
