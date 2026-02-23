import { DataTypes, Model } from "sequelize";
import sequelize from "../config/sequelize-connection";

class User extends Model {
	declare id: string;
	declare first_name: string;
	declare last_name: string;
	declare email: string;
	declare phone: string;
	declare password: string;
	declare status: "inactive" | "active" | "suspended";
	declare readonly created_at: Date;
	declare readonly updated_at: Date;
}

User.init(
	{
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER,
		},
		first_name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		last_name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false,
		},
		phone: {
			type: DataTypes.STRING,
		},
		password: {
			type: DataTypes.STRING,
		},
		status: {
			type: DataTypes.ENUM,
			values: ["inactive", "active", "suspended"],
			defaultValue: "inactive",
		},
	},
	{
		sequelize,
		modelName: "User",
		timestamps: true,
	},
);

export default User;
