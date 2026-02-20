import { DataTypes, Model } from "sequelize";
import sequelize from "@repo/shared-databse/dist/server";

class RolePermission extends Model {}

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
		tableName: "role_permissions",
		timestamps: false,
	},
);

export default RolePermission;
