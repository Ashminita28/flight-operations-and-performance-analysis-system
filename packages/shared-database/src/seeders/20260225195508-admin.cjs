"use strict";

const bcrypt = require("bcrypt");
const crypto = require("crypto");

module.exports = {
	async up(queryInterface) {
		const id = crypto.randomUUID();

		await queryInterface.bulkInsert("Users", [
			{
				id: id,
				first_name: "Admin",
				last_name: "User",
				email: "admin@aviation.com",
				phone: "9999999999",
				password: await bcrypt.hash("Admin@123", 10),
				status: "active",
				created_at: new Date(),
				updated_at: new Date(),
			},
		]);
	},

	async down(queryInterface) {
		await queryInterface.bulkDelete("Users", null, {});
	},
};
