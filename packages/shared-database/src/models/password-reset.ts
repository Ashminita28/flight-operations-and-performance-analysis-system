import { Model, DataTypes } from "sequelize";
import sequelize from "../sequelize-connection";

export class PasswordReset extends Model {
	declare id: string;

	declare email: string;

	declare otp: string;

	declare expires_at: Date;

	declare readonly created_at: Date;
	declare readonly updated_at: Date;
}

PasswordReset.init(
	{
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4,
		},

		email: DataTypes.STRING,

		otp: DataTypes.STRING,

		expires_at: DataTypes.DATE,
	},
	{
		sequelize,
		tableName: "PasswordResets",
		timestamps: true,
		underscored: true,
	},
);
