module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("password_resets", {
			id: {
				type: Sequelize.UUID,
				primaryKey: true,
				defaultValue: Sequelize.UUIDV4,
			},

			email: Sequelize.STRING,

			otp: Sequelize.STRING,

			expires_at: Sequelize.DATE,

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
		await queryInterface.dropTable("password_resets");
	},
};
