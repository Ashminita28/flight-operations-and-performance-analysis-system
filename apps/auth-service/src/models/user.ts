import { DataTypes, Model } from "sequelize";
import sequelize from "@repo/shared-databse/dist/server.js";

class User extends Model {
	public id!: string;
	public name!: string;
	public email!: string;
	public phone!: string;
	public password!: string;
	public status!: "inactive" | "active" | "suspended";
	public refreshToken!: string;
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
		phone: DataTypes.STRING,
		email: {
			type: DataTypes.STRING,
		},
		password: { type: DataTypes.STRING },
		status: DataTypes.ENUM("inactive", "active", "suspended"),
		refreshToken: DataTypes.STRING,
	},
	{
		sequelize,
		modelName: "User",
		tableName: "Users",
		timestamps: true,
	},
);

export default User;
