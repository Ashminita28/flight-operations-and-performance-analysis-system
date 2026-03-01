"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("aircraft", {
			id: {
				type: Sequelize.UUID,
				allowNull: false,
				primaryKey: true,
				defaultValue: Sequelize.UUIDV4,
			},
			registration: {
				type: Sequelize.STRING(20),
				allowNull: false,
				unique: true,
			},
			icao_type: {
				type: Sequelize.STRING(10),
				allowNull: false,
			},
			manufacturer: {
				type: Sequelize.STRING(100),
				allowNull: false,
			},
			model: {
				type: Sequelize.STRING(100),
				allowNull: false,
			},
			seat_capacity: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			fuel_capacity_kg: {
				type: Sequelize.DECIMAL(10, 2),
				allowNull: false,
			},
			max_payload_kg: {
				type: Sequelize.DECIMAL(10, 2),
				allowNull: false,
			},
			year_of_manufacture: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			status: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			base_airport_code: {
				type: Sequelize.STRING(10),
				references: {
					model: "airports",
					key: "iata_code",
				},
				onDelete: "RESTRICT",
				onUpdate: "CASCADE",
			},
			notes: {
				type: Sequelize.TEXT,
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
		await queryInterface.dropTable("aircraft");
	},
};
