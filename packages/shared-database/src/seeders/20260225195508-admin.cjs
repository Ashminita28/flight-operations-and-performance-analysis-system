const bcrypt = require("bcrypt");
const crypto = require("crypto");

module.exports = {
	async up(queryInterface) {
		const id = crypto.randomUUID();

		await queryInterface.bulkInsert("users", [
			{
				id: id,
				first_name: "Ashminita",
				last_name: "Baliarsingh",
				email: "ashminita_aviation23@gmail.com",
				phone: "9999999999",
				password: await bcrypt.hash("Admin@123", 10),
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
