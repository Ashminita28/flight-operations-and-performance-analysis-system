module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("user_roles", {
			user_id: {
				type: Sequelize.UUID,
				allowNull: false,
				references: {
					model: "users",
					key: "id",
				},
				onDelete: "CASCADE",
			},

			role_id: {
				type: Sequelize.UUID,
				allowNull: false,
				references: {
					model: "roles",
					key: "id",
				},
				onDelete: "CASCADE",
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
		await queryInterface.addConstraint("user_roles", {
			fields: ["role_id", "user_id"],
			type: "primary key",
			name: "pk_user_roles",
		});
	},

	async down(queryInterface) {
		await queryInterface.dropTable("user_roles");
	},
};
