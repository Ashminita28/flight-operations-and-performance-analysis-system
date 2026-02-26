"use strict";

const crypto = require("crypto");

module.exports = {
	async up(queryInterface) {
		await queryInterface.bulkInsert("Roles", [
			{
				id: crypto.randomUUID(),
				name: "Admin",
				created_at: new Date(),
				updated_at: new Date(),
			},

			{
				id: crypto.randomUUID(),
				name: "Manager",
				created_at: new Date(),
				updated_at: new Date(),
			},

			{
				id: crypto.randomUUID(),
				name: "Operations",
				created_at: new Date(),
				updated_at: new Date(),
			},

			{
				id: crypto.randomUUID(),
				name: "Analyst",
				created_at: new Date(),
				updated_at: new Date(),
			},
		]);
	},

	async down(queryInterface) {
		await queryInterface.bulkDelete("Roles", null, {});
	},
};
