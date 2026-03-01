"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("operational_events", {
			id: {
				type: Sequelize.UUID,
				allowNull: false,
				primaryKey: true,
				defaultValue: Sequelize.UUIDV4,
			},
			flight_id: {
				type: Sequelize.UUID,
				references: {
					model: "flights",
					key: "id",
				},
				onDelete: "RESTRICT",
				onUpdate: "CASCADE",
			},
			event_type: {
				type: Sequelize.STRING,
			},
			delay_category_id: {
				type: Sequelize.UUID,
				references: {
					model: "delay_categories",
					key: "id",
				},
				onDelete: "SET NULL",
			},
			delay_minutes: {
				type: Sequelize.INTEGER,
			},
			description: {
				type: Sequelize.TEXT,
				allowNull: false,
			},
			event_time: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			resolved_at: {
				type: Sequelize.DATE,
			},
			severity: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			reported_by: {
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
		await queryInterface.dropTable("operational_events");
	},
};
