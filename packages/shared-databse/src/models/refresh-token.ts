import sequelize from "../config/sequelize-connection";
import { DataTypes, Model } from "sequelize";

class RefreshToken extends Model {
	declare id: string;
	declare user_id: string;
	declare token: string;
	declare expires_at: Date;
	declare is_revoked: boolean;
	declare readonly created_at: Date;
	declare readonly updated_at: Date;
}

RefreshToken.init(
	{
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.UUID,
		},
		user_id: {
			type: DataTypes.UUID,
		},
		token: {
			type: DataTypes.STRING,
		},
		expires_at: {
			type: DataTypes.DATE,
		},
		is_revoked: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
		},
	},
	{
		sequelize,
		modelName: "RefreshToken",
		timestamps: true,
	},
);

export default RefreshToken;
