"use strict";

const crypto = require("crypto");

module.exports = {
	async up(queryInterface) {
		await queryInterface.bulkInsert("aircraft", [
			{
				id: crypto.randomUUID(),

				registration: "VT-ANA",

				manufacturer: "Airbus",
				icao_type: "A320",

				seat_capacity: 180,

				fuel_capacity_kg: 24200,

				max_payload_kg: 19000,

				year_of_manufacture: 2018,

				model: "A320",

				seat_capacity: 180,

				status: "active",

				base_airport_code: "DEL",

				createdAt: new Date(),
				updatedAt: new Date(),
			},

			{
				id: crypto.randomUUID(),

				registration: "VT-ANB",

				manufacturer: "Airbus",

				model: "A321",
				icao_type: "A321",

				seat_capacity: 220,

				fuel_capacity_kg: 32000,

				max_payload_kg: 26000,

				year_of_manufacture: 2020,

				seat_capacity: 220,

				status: "active",

				base_airport_code: "BOM",

				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	async down(queryInterface) {
		await queryInterface.bulkDelete("aircraft", null, {});
	},
};
