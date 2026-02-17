import { DataTypes, Model } from "sequelize";
import sequelize from "@repo/shared-databse/dist/server.js";

class User extends Model {
	declare id: string;
	declare name: string;
	declare email: string;
	declare password: string;
	declare roleId: string;
	declare refreshToken: string;
	declare readonly createdAt: Date;
	declare readonly updatedAt: Date;
}

User.init(
	{
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			allowNull: false,
			defaultValue: DataTypes.UUIDV4,
		},
		name: {
			type: DataTypes.STRING,
		},
		email: {
			type: DataTypes.STRING,
		},
		password: { type: DataTypes.STRING },
		roleId: { type: DataTypes.STRING },
		refreshToken: { type: DataTypes.STRING },
	},
	{
		sequelize,
		modelName: "User",
		tableName: "Users",
		timestamps: true,
	},
);

export default User;
