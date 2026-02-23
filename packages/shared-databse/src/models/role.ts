import { DataTypes, Model } from "sequelize";
import sequelize from "../config/sequelize-connection";

class Role extends Model {
	declare id: string;
	declare role_name: string;
	declare readonly created_at: Date;
	declare readonly updated_at: Date;
}

Role.init(
	{
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.UUID,
		},
		role_name: {
			type: DataTypes.STRING,
			unique: true,
		},
	},
	{
		sequelize,
		modelName: "Role",
		timestamps: true,
	},
);

export default Role;
