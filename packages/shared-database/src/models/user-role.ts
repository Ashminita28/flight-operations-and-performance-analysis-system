import { Model, DataTypes } from "sequelize";
import sequelize from "../sequelize-connection";

export class UserRole extends Model {
	declare id: string;

	declare user_id: string;

	declare role_id: string;

	declare readonly createdAt: Date;
	declare readonly updatedAt: Date;
}

UserRole.init(
	{
		user_id: {
			type: DataTypes.UUID,
			primaryKey: true,
		},

		role_id: {
			type: DataTypes.UUID,
			primaryKey: true,
		},
	},
	{
		sequelize,
		tableName: "user_roles",
		timestamps: true,
	},
);
