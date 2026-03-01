module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("user_roles", {
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
		await queryInterface.dropTable("user_roles");
	},
};
