"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("role_permissions", {
			role_id: {
				type: Sequelize.UUID,
				allowNull: false,
				references: {
					model: "roles",
					key: "id",
				},
				onDelete: "CASCADE",
			},
			permission_id: {
				type: Sequelize.UUID,
				allowNull: false,
				references: {
					model: "permissions",
					key: "id",
				},
				onDelete: "CASCADE",
			},
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

		await queryInterface.addConstraint("role_permissions", {
			fields: ["role_id", "permission_id"],
			type: "primary key",
			name: "pk_role_permissions",
		});
	},

	async down(queryInterface) {
		await queryInterface.dropTable("role_permissions");
	},
};
