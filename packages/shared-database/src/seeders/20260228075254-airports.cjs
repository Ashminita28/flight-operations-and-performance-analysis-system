"use strict";

module.exports = {
	async up(queryInterface) {
		await queryInterface.bulkInsert("airports", [
			{
				iata_code: "DEL",
				icao_code: "VIDP",
				name: "Delhi Airport",
				city: "Delhi",
				country: "India",
				timezone: "Asia/Kolkata",
				latitude: 28.5562,
				longitude: 77.1,
				is_active: true,
				createdAt: new Date(),
				updatedAt: new Date(),
			},

			{
				iata_code: "BOM",
				icao_code: "VABB",
				name: "Mumbai Airport",
				city: "Mumbai",
				country: "India",
				timezone: "Asia/Kolkata",
				latitude: 19.0896,
				longitude: 72.8656,
				is_active: true,
				createdAt: new Date(),
				updatedAt: new Date(),
			},

			{
				iata_code: "BLR",
				icao_code: "VOBL",
				name: "Bangalore Airport",
				city: "Bangalore",
				country: "India",
				timezone: "Asia/Kolkata",
				latitude: 13.1986,
				longitude: 77.7066,
				is_active: true,
				createdAt: new Date(),
				updatedAt: new Date(),
			},

			{
				iata_code: "HYD",
				icao_code: "VOHS",
				name: "Hyderabad Airport",
				city: "Hyderabad",
				country: "India",
				timezone: "Asia/Kolkata",
				latitude: 17.2403,
				longitude: 78.4294,
				is_active: true,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	async down(queryInterface) {
		await queryInterface.bulkDelete("airports", null, {});
	},
};
