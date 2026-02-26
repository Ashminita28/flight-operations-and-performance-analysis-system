module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("AircraftMaintenance", {
			id: {
				type: Sequelize.UUID,
				primaryKey: true,
				defaultValue: Sequelize.UUIDV4,
			},

			aircraft_id: Sequelize.UUID,

			maintenance_type: Sequelize.STRING,

			description: Sequelize.TEXT,

			status: Sequelize.STRING,

			next_due_at: Sequelize.DATE,

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
		await queryInterface.dropTable("AircraftMaintenance");
	},
};
