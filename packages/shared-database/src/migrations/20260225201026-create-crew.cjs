module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Crews", {
			id: {
				type: Sequelize.UUID,
				primaryKey: true,
				defaultValue: Sequelize.UUIDV4,
			},

			crew_name: Sequelize.STRING,

			position: Sequelize.STRING,

			contact_info: Sequelize.STRING,

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
		await queryInterface.dropTable("Crews");
	},
};
