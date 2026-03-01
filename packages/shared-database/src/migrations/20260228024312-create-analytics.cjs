"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("analytics", {
			id: {
				type: Sequelize.UUID,
				allowNull: false,
				primaryKey: true,
				defaultValue: Sequelize.UUIDV4,
			},
			job_type: {
				type: Sequelize.STRING(100),
			},
			status: {
				type: Sequelize.STRING,
			},
			parameters: {
				type: Sequelize.JSON,
			},
			result_summary: {
				type: Sequelize.JSON,
			},
			error_message: {
				type: Sequelize.TEXT,
			},
			started_at: {
				type: Sequelize.DATE,
			},
			completed_at: {
				type: Sequelize.DATE,
			},
			triggered_by: {
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
		await queryInterface.dropTable("analytics");
	},
};
