"use strict";

const crypto = require("crypto");

module.exports = {
	async up(queryInterface) {
		await queryInterface.bulkInsert("permissions", [
			{
				id: crypto.randomUUID(),
				name: "create-aircraft",
				createdAt: new Date(),
				updatedAt: new Date(),
			},

			{
				id: crypto.randomUUID(),
				name: "view-aircraft",
				createdAt: new Date(),
				updatedAt: new Date(),
			},

			{
				id: crypto.randomUUID(),
				name: "create-flight",
				createdAt: new Date(),
				updatedAt: new Date(),
			},

			{
				id: crypto.randomUUID(),
				name: "update-flight",
				createdAt: new Date(),
				updatedAt: new Date(),
			},

			{
				id: crypto.randomUUID(),
				name: "view-flights",
				createdAt: new Date(),
				updatedAt: new Date(),
			},

			{
				id: crypto.randomUUID(),
				name: "view-dashboard",
				createdAt: new Date(),
				updatedAt: new Date(),
			},

			{
				id: crypto.randomUUID(),
				name: "manage-users",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	async down(queryInterface) {
		await queryInterface.bulkDelete("permissions", null, {});
	},
};
