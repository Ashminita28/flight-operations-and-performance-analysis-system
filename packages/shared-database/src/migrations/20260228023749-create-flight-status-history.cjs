"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("flight_status_histories", {
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
			},
			previous_status: {
				type: Sequelize.STRING(30),
			},
			new_status: {
				type: Sequelize.STRING(30),
				allowNull: false,
			},
			changed_at: {
				type: Sequelize.DATE,
				defaultValue: Sequelize.NOW,
			},
			changed_by: {
				type: Sequelize.UUID,
				references: {
					model: "users",
					key: "id",
				},
				onDelete: "RESTRICT",
				onUpdate: "CASCADE",
			},
			reason: {
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
		await queryInterface.dropTable("flight_status_histories");
	},
};
