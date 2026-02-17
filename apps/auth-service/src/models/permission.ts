import sequelize from "@repo/shared-databse/dist/server.js";
import { DataTypes, Model } from "sequelize";

class Permission extends Model {
	declare id: string;
	declare name: string;
}

Permission.init(
	{
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4,
		},
		permission: { type: DataTypes.STRING },
	},
	{
		sequelize,
		tableName: "Permissions",
		timestamps: true,
	},
);

export default Permission;
