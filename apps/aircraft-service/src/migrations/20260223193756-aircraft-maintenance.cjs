"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("aircraft_maintenance", {
			id: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.UUID,
			},
			aircraft_id: {
				type: Sequelize.UUID,
				allowNull: false,
			},
			maintenance_type: {
				type: Sequelize.STRING(100),
				allowNull: false,
			},
			description: {
				type: Sequelize.TEXT,
			},
			next_due_at: {
				type: Sequelize.DATE,
			},
			status: {
				type: Sequelize.STRING(50),
				allowNull: false,
				defaultValue: "COMPLETED",
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
		await queryInterface.dropTable("aircraft_maintenance");
	},
};
