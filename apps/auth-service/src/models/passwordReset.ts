import sequelize from "@repo/shared-databse/dist/server.js";
import { DataTypes, Model } from "sequelize";

class PasswordReset extends Model {
	declare id: string;
	declare email: string;
	declare otp: string;
	declare expiresIn: Date;
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
		expiresAt: { type: DataTypes.STRING },
	},
	{ sequelize, tableName: "password_reset", timestamps: false },
);

export default PasswordReset;
