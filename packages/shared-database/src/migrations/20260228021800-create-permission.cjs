"use strict";

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("permissions", {
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

			createdAt: {
				type: Sequelize.DATE,
				defaultValue: Sequelize.NOW,
			},

			updatedAt: {
				type: Sequelize.DATE,
				defaultValue: Sequelize.NOW,
			},
		});
	},

	async down(queryInterface) {
		await queryInterface.dropTable("permissions");
	},
};
