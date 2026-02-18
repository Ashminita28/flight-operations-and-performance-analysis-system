import sequelize from "@repo/shared-databse/dist/server.js";
import { DataTypes, Model } from "sequelize";

class PasswordReset extends Model {
	declare id: string;
	declare email: string;
	declare otp: string;
	declare expiresAt: Date;
}

PasswordReset.init(
	{
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4,
		},
		email: { type: DataTypes.STRING },
		otp: { type: DataTypes.STRING },
		expiresAt: { type: DataTypes.DATE },
	},
	{ sequelize, tableName: "password_reset", timestamps: false },
);

export default PasswordReset;
