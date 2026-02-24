"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("aircraft", {
			id: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.UUID,
			},
			registration_number: {
				type: Sequelize.STRING(50),
				allowNull: false,
				unique: true,
			},
			model: {
				type: Sequelize.STRING(100),
				allowNull: false,
			},
			manufacturer: {
				type: Sequelize.STRING(100),
				allowNull: false,
			},
			capacity: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			manufacture_year: {
				type: Sequelize.INTEGER,
			},
			total_flight_hours: {
				type: Sequelize.DECIMAL(10, 2),
				defaultValue: 0,
			},
			is_active: {
				type: Sequelize.BOOLEAN,
				defaultValue: true,
			},
			last_maintenance_date: {
				type: Sequelize.DATE,
			},
			next_maintenance_date: {
				type: Sequelize.DATE,
			},
			notes: {
				type: Sequelize.TEXT,
			},
			created_at: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updated_at: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},

	async down(queryInterface) {
		await queryInterface.dropTable("aircraft");
	},
};
