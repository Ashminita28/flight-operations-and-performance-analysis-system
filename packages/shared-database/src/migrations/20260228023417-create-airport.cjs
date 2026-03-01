"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("airports", {
			iata_code: {
				type: Sequelize.STRING(3),
				allowNull: false,
				primaryKey: true,
			},
			icao_code: {
				type: Sequelize.STRING(4),
				unique: true,
			},
			name: {
				type: Sequelize.STRING(200),
				allowNull: false,
			},
			city: {
				type: Sequelize.STRING(100),
				allowNull: false,
			},
			country: {
				type: Sequelize.STRING(100),
				allowNull: false,
			},
			timezone: {
				type: Sequelize.STRING(50),
				allowNull: false,
			},
			latitude: {
				type: Sequelize.DECIMAL(10, 6),
				allowNull: false,
			},
			longitude: {
				type: Sequelize.DECIMAL(10, 6),
				allowNull: false,
			},
			elevation_ft: {
				type: Sequelize.INTEGER,
			},
			is_active: {
				type: Sequelize.BOOLEAN,
				defaultValue: true,
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
		await queryInterface.dropTable("airports");
	},
};
