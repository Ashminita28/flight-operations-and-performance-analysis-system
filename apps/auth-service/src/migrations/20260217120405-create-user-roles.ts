import { DataTypes, QueryInterface } from "sequelize";

export default {
	up: async (queryInterface: QueryInterface) => {
		await queryInterface.createTable("UserRoles", {
			id: {
				allowNull: false,
				primaryKey: true,
				type: DataTypes.UUID,
			},
			user_id: {
				type: DataTypes.UUID,
				allowNull: false,
			},
			role_id: {
				type: DataTypes.UUID,
				allowNull: false,
			},
		});
	},
	down: async (queryInterface: QueryInterface) => {
		await queryInterface.dropTable("UserRoles");
	},
};
