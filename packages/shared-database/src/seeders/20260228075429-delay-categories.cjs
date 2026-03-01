"use strict";

const crypto = require("crypto");

module.exports = {
	async up(queryInterface) {
		await queryInterface.bulkInsert("delay_categories", [
			{
				id: crypto.randomUUID(),

				code: "WX",

				name: "Weather",

				description: "Weather delays",

				is_controllable: false,
				createdAt: new Date(),
				updatedAt: new Date(),
			},

			{
				id: crypto.randomUUID(),

				code: "MX",

				name: "Technical",

				description: "Technical problems",

				is_controllable: true,
				createdAt: new Date(),
				updatedAt: new Date(),
			},

			{
				id: crypto.randomUUID(),

				code: "CR",

				name: "Crew",

				description: "Crew delays",

				is_controllable: true,
				createdAt: new Date(),
				updatedAt: new Date(),
			},

			{
				id: crypto.randomUUID(),

				code: "ATC",

				name: "ATC",

				description: "Air traffic control",

				is_controllable: false,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	async down(queryInterface) {
		await queryInterface.bulkDelete("delay_categories", null, {});
	},
};
