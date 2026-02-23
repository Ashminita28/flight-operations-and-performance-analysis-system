import sequelize from "../config/sequelize-connection";
import { DataTypes, Model } from "sequelize";

class Permission extends Model {
	declare id: string;
	declare permission_name: string;
	declare readonly created_at: Date;
	declare readonly updated_at: Date;
}

Permission.init(
	{
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4,
		},
		permission_name: { type: DataTypes.STRING },
	},
	{
		sequelize,
		modelName: "Permission",
		timestamps: true,
	},
);

export default Permission;
