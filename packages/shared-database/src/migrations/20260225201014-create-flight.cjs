module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Flights", {
			id: {
				type: Sequelize.UUID,
				primaryKey: true,
				defaultValue: Sequelize.UUIDV4,
			},

			flight_number: Sequelize.STRING,

			departure_airport: Sequelize.STRING,

			arrival_airport: Sequelize.STRING,

			departure_date: Sequelize.DATEONLY,

			departure_datetime: Sequelize.TIME,

			arrival_datetime: Sequelize.TIME,

			aircraft_id: Sequelize.UUID,

			status: {
				type: Sequelize.ENUM("Scheduled", "Delayed", "Cancelled", "Completed"),
				defaultValue: "Scheduled",
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
		await queryInterface.dropTable("Flights");
	},
};
