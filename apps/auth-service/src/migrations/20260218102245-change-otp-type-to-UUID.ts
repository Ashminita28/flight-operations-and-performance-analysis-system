"use strict";

import { QueryInterface, DataTypes } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
export default {
	async up(queryInterface: QueryInterface) {
		/**
     * Add altering commands here.
     *
     
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
		await queryInterface.changeColumn("password_reset", "otp", {
			type: DataTypes.STRING,
		});
	},

	async down(queryInterface: QueryInterface) {
		/**
		 * Add reverting commands here.
		 *
		 * Example:
		 * await queryInterface.dropTable('users');
		 */
		await queryInterface.changeColumn("password_reset", "otp", {
			type: DataTypes.UUID,
		});
	},
};
