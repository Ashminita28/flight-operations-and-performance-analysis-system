"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("flights", {
			id: {
				type: Sequelize.UUID,
				allowNull: false,
				primaryKey: true,
				defaultValue: Sequelize.UUIDV4,
			},
			flight_number: {
				type: Sequelize.STRING(20),
				allowNull: false,
			},
			airline_code: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			origin_airport: {
				type: Sequelize.STRING(10),
				allowNull: false,
				references: {
					model: "airports",
					key: "iata_code",
				},
				onDelete: "RESTRICT",
				onUpdate: "CASCADE",
			},
			destination_airport: {
				type: Sequelize.STRING,
				references: {
					model: "airports",
					key: "iata_code",
				},
				onDelete: "RESTRICT",
				onUpdate: "CASCADE",
			},
			aircraft_id: {
				type: Sequelize.UUID,
				allowNull: false,
				references: {
					model: "aircraft",
					key: "id",
				},
				onDelete: "RESTRICT",
				onUpdate: "CASCADE",
			},
			status: {
				type: Sequelize.ENUM(
					"scheduled",
					"boarding",
					"departed",
					"landed",
					"diverted",
					"cancelled",
					"delayed",
				),
				allowNull: false,
			},
			scheduled_departure: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			scheduled_arrival: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			estimated_departure: {
				type: Sequelize.DATE,
			},
			estimated_arrival: {
				type: Sequelize.DATE,
			},
			actual_departure: {
				type: Sequelize.DATE,
			},
			actual_arrival: {
				type: Sequelize.DATE,
			},
			gate_departure: {
				type: Sequelize.STRING,
			},
			gate_arrival: {
				type: Sequelize.STRING,
			},
			flight_date: {
				type: Sequelize.DATEONLY,
				allowNull: false,
			},
			is_return_flight: {
				type: Sequelize.BOOLEAN,
				defaultValue: false,
			},
			created_by: {
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
		await queryInterface.dropTable("flights");
	},
};
