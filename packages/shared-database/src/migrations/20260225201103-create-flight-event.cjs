module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("FlightEvents", {
			id: {
				type: Sequelize.UUID,
				primaryKey: true,
				defaultValue: Sequelize.UUIDV4,
			},

			flight_id: Sequelize.UUID,

			event_type: {
				type: Sequelize.STRING,
			},

			description: Sequelize.TEXT,

			event_time: Sequelize.DATE,

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
		await queryInterface.dropTable("FlightEvents");
	},
};
