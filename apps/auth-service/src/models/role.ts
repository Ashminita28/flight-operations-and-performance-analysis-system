import { DataTypes, Model } from "sequelize";
import sequelize from "@repo/shared-databse/dist/server";

class Role extends Model {
	declare id: string;
	declare name: string;
}

Role.init(
	{
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			allowNull: false,
			defaultValue: DataTypes.UUIDV4,
		},
		role: {
			type: DataTypes.STRING,
			unique: true,
		},
	},
	{
		sequelize,
		modelName: "Role",
		tableName: "Roles",
		timestamps: true,
	},
);

export default Role;
