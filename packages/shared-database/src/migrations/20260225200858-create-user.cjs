"use strict";

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Users", {
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

			created_at: {
				type: Sequelize.DATE,
				defaultValue: Sequelize.NOW,
			},

			updated_at: {
				type: Sequelize.DATE,
				defaultValue: Sequelize.NOW,
			},
		});
	},

	async down(queryInterface) {
		await queryInterface.dropTable("Users");
	},
};
