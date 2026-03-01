"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("crew_members", {
			id: {
				type: Sequelize.UUID,
				allowNull: false,
				primaryKey: true,
				defaultValue: Sequelize.UUIDV4,
			},
			employee_id: {
				type: Sequelize.STRING,
				unique: true,
				allowNull: false,
			},
			full_name: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			role: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			license_number: {
				type: Sequelize.STRING,
			},
			license_expiry: {
				type: Sequelize.DATE,
			},
			base_airport: {
				type: Sequelize.STRING,
				references: {
					model: "airports",
					key: "iata_code",
				},
				onDelete: "RESTRICT",
				onUpdate: "CASCADE",
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
		await queryInterface.dropTable("crew_members");
	},
};
