import { DataTypes, Model } from "sequelize";
import sequelize from "@repo/shared-databse/dist/server";

class UserRole extends Model {}

UserRole.init(
	{
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4,
		},
		user_id: DataTypes.UUID,
		role_id: DataTypes.UUID,
	},
	{
		sequelize,
		tableName: "UserRoles",
		timestamps: false,
	},
);

export default UserRole;
