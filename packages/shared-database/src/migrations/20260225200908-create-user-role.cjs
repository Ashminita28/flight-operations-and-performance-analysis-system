module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("UserRoles", {
			id: {
				type: Sequelize.UUID,
				primaryKey: true,
				defaultValue: Sequelize.UUIDV4,
			},

			user_id: {
				type: Sequelize.UUID,
			},

			role_id: {
				type: Sequelize.UUID,
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
		await queryInterface.dropTable("UserRoles");
	},
};
