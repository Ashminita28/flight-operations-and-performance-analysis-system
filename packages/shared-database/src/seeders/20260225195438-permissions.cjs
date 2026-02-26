"use strict";

const crypto = require("crypto");

module.exports = {
	async up(queryInterface) {
		await queryInterface.bulkInsert("Permissions", [
			{
				id: crypto.randomUUID(),
				name: "create-aircraft",
				created_at: new Date(),
				updated_at: new Date(),
			},

			{
				id: crypto.randomUUID(),
				name: "view-aircraft",
				created_at: new Date(),
				updated_at: new Date(),
			},

			{
				id: crypto.randomUUID(),
				name: "create-flight",
				created_at: new Date(),
				updated_at: new Date(),
			},

			{
				id: crypto.randomUUID(),
				name: "update-flight",
				created_at: new Date(),
				updated_at: new Date(),
			},

			{
				id: crypto.randomUUID(),
				name: "view-flights",
				created_at: new Date(),
				updated_at: new Date(),
			},

			{
				id: crypto.randomUUID(),
				name: "view-dashboard",
				created_at: new Date(),
				updated_at: new Date(),
			},

			{
				id: crypto.randomUUID(),
				name: "manage-users",
				created_at: new Date(),
				updated_at: new Date(),
			},
		]);
	},

	async down(queryInterface) {
		await queryInterface.bulkDelete("Permissions", null, {});
	},
};
