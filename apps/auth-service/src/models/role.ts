import { DataTypes, Model } from "sequelize";
import sequelize from "@repo/shared-databse/dist/server";

class Role extends Model {
	public id!: string;
	public name!: string;
}

Role.init(
	{
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			allowNull: false,
			defaultValue: DataTypes.UUIDV4,
		},
		name: {
			type: DataTypes.STRING,
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
