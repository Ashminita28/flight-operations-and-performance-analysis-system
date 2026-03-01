"use strict";

const crypto = require("crypto");

module.exports = {
	async up(queryInterface) {
		await queryInterface.bulkInsert("roles", [
			{
				id: crypto.randomUUID(),
				name: "Admin",
				description: "System Administrator",
				createdAt: new Date(),
				updatedAt: new Date(),
			},

			{
				id: crypto.randomUUID(),
				name: "Manager",
				description: "Management User",
				createdAt: new Date(),
				updatedAt: new Date(),
			},

			{
				id: crypto.randomUUID(),
				name: "Operations",
				description: "Operation staff",
				createdAt: new Date(),
				updatedAt: new Date(),
			},

			{
				id: crypto.randomUUID(),
				name: "Analyst",
				description: "Performance Analyst",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	async down(queryInterface) {
		await queryInterface.bulkDelete("roles", null, {});
	},
};
