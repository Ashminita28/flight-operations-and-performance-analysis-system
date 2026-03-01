"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("flight_performances", {
			id: {
				type: Sequelize.UUID,
				allowNull: false,
				primaryKey: true,
				defaultValue: Sequelize.UUIDV4,
			},
			flight_id: {
				type: Sequelize.UUID,
				unique: true,
				references: {
					model: "flights",
					key: "id",
				},
				onDelete: "RESTRICT",
				onUpdate: "CASCADE",
			},
			fuel_planned_kg: {
				type: Sequelize.DECIMAL,
			},
			fuel_uplifted_kg: {
				type: Sequelize.DECIMAL,
			},
			fuel_used_kg: {
				type: Sequelize.DECIMAL,
			},
			fuel_remaining_kg: {
				type: Sequelize.DECIMAL,
			},
			fuel_efficiency_kg_per_km: {
				type: Sequelize.DECIMAL,
			},
			block_time_minutes: {
				type: Sequelize.INTEGER,
			},
			flight_time_minutes: {
				type: Sequelize.INTEGER,
			},
			distance_km: {
				type: Sequelize.DECIMAL,
			},
			passengers_count: {
				type: Sequelize.INTEGER,
			},
			cargo_weight_kg: {
				type: Sequelize.DECIMAL,
			},
			payload_kg: {
				type: Sequelize.DECIMAL,
			},
			load_factor_pct: {
				type: Sequelize.DECIMAL,
			},
			cruise_altitude_ft: {
				type: Sequelize.INTEGER,
			},
			average_speed_kmh: {
				type: Sequelize.DECIMAL,
			},
			landing_weight_kg: {
				type: Sequelize.DECIMAL,
			},
			takeoff_weight_kg: {
				type: Sequelize.DECIMAL,
			},
			co2_emissions_kg: {
				type: Sequelize.DECIMAL,
			},
			entered_by: {
				type: Sequelize.UUID,
				references: {
					model: "users",
					key: "id",
				},
				onDelete: "RESTRICT",
				onUpdate: "CASCADE",
			},
			createdAt: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.NOW,
			},
			updatedAt: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.NOW,
			},
		});
	},
	async down(queryInterface) {
		await queryInterface.dropTable("flight_performances");
	},
};
