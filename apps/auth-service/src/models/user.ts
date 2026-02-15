import { DataTypes, Model } from "sequelize";
import sequelize from "@repo/shared-databse/dist/server";

class User extends Model {}

User.init(
	{
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			allowNull: false,
			defaultValue: DataTypes.UUIDV4,
		},
		name: { type: DataTypes.STRING },

		email: { type: DataTypes.STRING },
		createdAt: {
			allowNull: false,
			type: DataTypes.DATE,
		},
		updatedAt: {
			allowNull: false,
			type: DataTypes.DATE,
		},
	},
	{
		sequelize,
		modelName: "User",
		tableName: "Users",
		timestamps: true,
	},
);

export default User;
