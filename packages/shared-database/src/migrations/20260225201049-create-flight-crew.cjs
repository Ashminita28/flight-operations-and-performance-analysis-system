module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("FlightCrews", {
			id: {
				type: Sequelize.UUID,
				primaryKey: true,
				defaultValue: Sequelize.UUIDV4,
			},

			flight_id: Sequelize.UUID,

			crew_id: Sequelize.UUID,

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
		await queryInterface.dropTable("FlightCrews");
	},
};
