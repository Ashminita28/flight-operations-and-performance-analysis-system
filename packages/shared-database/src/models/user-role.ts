import { Model, DataTypes } from "sequelize";
import sequelize from "../sequelize-connection";

export class UserRole extends Model {
	declare id: string;

	declare user_id: string;

	declare role_id: string;

	declare readonly created_at: Date;
	declare readonly updated_at: Date;
}

UserRole.init(
	{
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4,
		},

		user_id: DataTypes.UUID,

		role_id: DataTypes.UUID,
	},
	{
		sequelize,
		tableName: "UserRoles",
		timestamps: true,
		underscored: true,
	},
);
