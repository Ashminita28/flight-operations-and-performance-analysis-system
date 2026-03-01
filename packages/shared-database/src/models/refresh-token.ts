import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../sequelize-connection";

interface RefreshTokenAttributes {
	id: string;
	user_id: string;
	token: string;
	expires_at: string;
	revoked: string;
	createdAt?: Date;
	updatedAt?: Date;
}

type RefreshTokenCreationAttributes = Optional<
	RefreshTokenAttributes,
	"id" | "createdAt" | "updatedAt"
>;
export class RefreshToken
	extends Model<RefreshTokenAttributes, RefreshTokenCreationAttributes>
	implements RefreshTokenAttributes
{
	declare id: string;
	declare user_id: string;
	declare token: string;
	declare expires_at: string;
	declare revoked: string;
	declare createdAt: Date;
	declare updatedAt: Date;
}
RefreshToken.init(
	{
		id: {
			type: DataTypes.UUID,
			allowNull: false,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4,
		},
		user_id: {
			type: DataTypes.UUID,
			allowNull: false,
		},
		token: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		expires_at: {
			type: DataTypes.DATE,
		},
		revoked: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
		},
	},
	{
		sequelize,
		tableName: "refresh_tokens",
		timestamps: true,
	},
);
