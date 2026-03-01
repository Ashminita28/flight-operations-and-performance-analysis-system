"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("reports", {
			id: {
				type: Sequelize.UUID,
				allowNull: false,
				primaryKey: true,
				defaultValue: Sequelize.UUIDV4,
			},
			report_type: {
				type: Sequelize.STRING(100),
				allowNull: false,
			},
			cache_key: {
				type: Sequelize.STRING(255),
				unique: true,
				allowNull: false,
			},
			data: {
				type: Sequelize.JSON,
				allowNull: false,
			},
			generated_at: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			expires_at: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			parameters: {
				type: Sequelize.JSON,
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
		await queryInterface.dropTable("reports");
	},
};
