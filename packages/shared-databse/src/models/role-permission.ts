import { DataTypes, Model } from "sequelize";
import sequelize from "../config/sequelize-connection";

class RolePermission extends Model {
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
		modelName: "RolePermission",
		timestamps: true,
	},
);

export default RolePermission;
