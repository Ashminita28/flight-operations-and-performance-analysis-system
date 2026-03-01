"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("users", {
			id: {
				type: Sequelize.UUID,
				primaryKey: true,
				defaultValue: Sequelize.UUIDV4,
			},

			first_name: Sequelize.STRING,

			last_name: Sequelize.STRING,

			email: {
				type: Sequelize.STRING,
				unique: true,
				allowNull: false,
			},

			phone: Sequelize.STRING,

			password: Sequelize.STRING,

			status: {
				type: Sequelize.ENUM("active", "inactive", "suspended"),
				defaultValue: "active",
			},
			refresh_token: Sequelize.STRING,
			createdAt: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.NOW,
			},
			updatedAt: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.NOW,
			},
		});
	},
	async down(queryInterface) {
		await queryInterface.dropTable("users");
	},
};
