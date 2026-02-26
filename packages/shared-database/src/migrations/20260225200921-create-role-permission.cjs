"use strict";

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("RolePermissions", {
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
		await queryInterface.dropTable("RolePermissions");
	},
};
