module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("PasswordResets", {
			id: {
				type: Sequelize.UUID,
				primaryKey: true,
				defaultValue: Sequelize.UUIDV4,
			},

			email: Sequelize.STRING,

			otp: Sequelize.STRING,

			expires_at: Sequelize.DATE,

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
		await queryInterface.dropTable("PasswordResets");
	},
};
