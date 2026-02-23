import { DataTypes, Model } from "sequelize";
import sequelize from "../config/sequelize-connection";
class UserRole extends Model {
	declare user_id: string;
	declare role_id: string;
	declare readonly created_at: Date;
	declare readonly updated_at: Date;
}

UserRole.init(
	{
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.UUID,
		},
		user_id: {
			type: DataTypes.UUID,
			allowNull: false,
		},
		role_id: {
			type: DataTypes.UUID,
			allowNull: false,
		},
	},
	{
		sequelize,
		modelName: "UserRole",
		timestamps: true,
	},
);
export default UserRole;
