import sequelize from "../config/sequelize-connection";
import { DataTypes, Model } from "sequelize";

class PasswordReset extends Model {
	declare id: string;
	declare user_id: string;
	declare token: string;
	declare expires_at: Date;
	declare is_used: boolean;
	declare readonly created_at: Date;
	declare readonly updated_at: Date;
}

PasswordReset.init(
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
		token: {
			type: DataTypes.STRING,
		},
		expires_at: {
			type: DataTypes.DATE,
		},
		is_used: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
		},
	},
	{ sequelize, modelName: "PasswordReset", timestamps: false },
);

export default PasswordReset;
