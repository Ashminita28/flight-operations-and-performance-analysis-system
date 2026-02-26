import { Model, DataTypes } from "sequelize";
import sequelize from "../sequelize-connection";

export class RolePermission extends Model {
	declare id: string;

	declare role_id: string;

	declare permission_id: string;

	declare readonly created_at: Date;
	declare readonly updated_at: Date;
}

RolePermission.init(
	{
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4,
		},

		role_id: DataTypes.UUID,

		permission_id: DataTypes.UUID,
	},
	{
		sequelize,
		tableName: "RolePermissions",
		timestamps: true,
		underscored: true,
	},
);
