"use strict";

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Permissions", {
			id: {
				type: Sequelize.UUID,
				primaryKey: true,
				defaultValue: Sequelize.UUIDV4,
			},

			name: {
				type: Sequelize.STRING,
				unique: true,
				allowNull: false,
			},

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
		await queryInterface.dropTable("Permissions");
	},
};
