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
		tableName: "user_roles",
		timestamps: true,
		indexes: [
			{
				unique: true,
				fields: ["user_id", "role_id"],
			},
		],
	},
);
