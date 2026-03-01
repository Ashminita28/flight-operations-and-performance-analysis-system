"use strict";

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("role_permissions", {
			id: {
				type: Sequelize.UUID,
				primaryKey: true,
				defaultValue: Sequelize.UUIDV4,
			},

			role_id: {
				type: Sequelize.UUID,
				allowNull: false,
			},

			permission_id: {
				type: Sequelize.UUID,
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
		await queryInterface.dropTable("role_permissions");
	},
};
