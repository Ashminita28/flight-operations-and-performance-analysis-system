import { Model, DataTypes } from "sequelize";
import sequelize from "../sequelize-connection";
import { Role } from "./role";

export class User extends Model {
	declare id: string;
	declare first_name: string;
	declare last_name: string;
	declare email: string;
	declare phone: string;
	declare password: string;
	declare status: string;
	declare refresh_token: string | null;

	declare readonly created_at: Date;
	declare readonly updated_at: Date;
	declare roles?: Role[];
}

User.init(
	{
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4,
		},

		first_name: DataTypes.STRING,
		last_name: DataTypes.STRING,

		email: {
			type: DataTypes.STRING,
			unique: true,
		},

		phone: DataTypes.STRING,

		password: DataTypes.STRING,

		status: DataTypes.STRING,

		refresh_token: DataTypes.STRING,
	},
	{
		sequelize,
		tableName: "Users",
		timestamps: true,
		underscored: true,
	},
);
