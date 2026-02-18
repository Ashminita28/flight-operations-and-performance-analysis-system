import sequelize from "@repo/shared-databse/dist/server.js";
import { DataTypes, Model } from "sequelize";

class Permission extends Model {
	public id!: string;
	public name!: string;
}

Permission.init(
	{
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4,
		},
		name: { type: DataTypes.STRING },
	},
	{
		sequelize,
		modelName: "Permission",
		tableName: "Permissions",
		timestamps: true,
	},
);

export default Permission;
