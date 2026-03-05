"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("notifications", {
			id: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4,
			},
			flight_id: {
				type: Sequelize.UUID,
				allowNull: false,
				references: {
					model: "flights",
					key: "id",
				},
				onDelete: "CASCADE",
				onUpdate: "CASCADE",
			},
			title: {
				type: Sequelize.STRING(100),
				allowNull: false,
			},
			message: {
				type: Sequelize.TEXT,
				allowNull: false,
			},
			type: {
				type: Sequelize.STRING(30),
				allowNull: false,
			},
			is_read: {
				type: Sequelize.BOOLEAN,
				defaultValue: false,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.NOW,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.NOW,
			},
		});
	},
	async down(queryInterface) {
		await queryInterface.dropTable("notifications");
	},
};
