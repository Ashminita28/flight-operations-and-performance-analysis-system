import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../sequelize-connection";

interface RolePermissionsAttributes {
	role_id: string;
	permission_id: string;
	createdAt?: Date;

	updatedAt?: Date;
}

type RolePermissionCreationAttributes = Optional<
	RolePermissionsAttributes,
	"role_id" | "permission_id" | "createdAt" | "updatedAt"
>;

export class RolePermission
	extends Model<RolePermissionsAttributes, RolePermissionCreationAttributes>
	implements RolePermissionsAttributes
{
	declare role_id: string;
	declare permission_id: string;
	declare createdAt: Date;

	declare updatedAt: Date;
}

RolePermission.init(
	{
		role_id: {
			type: DataTypes.UUID,
			primaryKey: true,
		},

		permission_id: {
			type: DataTypes.UUID,
			primaryKey: true,
		},
	},
	{
		sequelize,
		tableName: "role_permissions",
		timestamps: true,
	},
);
