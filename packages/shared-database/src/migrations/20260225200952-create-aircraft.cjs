module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Aircraft", {
			id: {
				type: Sequelize.UUID,
				primaryKey: true,
				defaultValue: Sequelize.UUIDV4,
			},

			registration_number: {
				type: Sequelize.STRING,
				unique: true,
			},

			model: Sequelize.STRING,

			manufacturer: Sequelize.STRING,

			capacity: Sequelize.INTEGER,

			manufacture_year: Sequelize.INTEGER,

			total_flight_hours: {
				type: Sequelize.FLOAT,
				defaultValue: 0,
			},

			is_active: {
				type: Sequelize.BOOLEAN,
				defaultValue: true,
			},

			last_maintenance_date: Sequelize.DATE,

			next_maintenance_date: Sequelize.DATE,

			notes: Sequelize.TEXT,

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
		await queryInterface.dropTable("Aircraft");
	},
};
