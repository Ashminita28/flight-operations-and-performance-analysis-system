import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "@repo/shared-databse/dist/server";

interface UserAttributes {
	id: string;
	name: string;
	email: string;
	password: string;
	createdAt: Date;
	updatedAt: Date;
}

type UserCreationAttributes = Optional<UserAttributes, "id">;

class User
	extends Model<UserAttributes, UserCreationAttributes>
	implements UserAttributes
{
	public id!: string;
	public name!: string;
	public email!: string;
	public password!: string;
	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
}

User.init(
	{
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			allowNull: false,
			defaultValue: DataTypes.UUIDV4,
		},
		name: { type: DataTypes.STRING },

		email: { type: DataTypes.STRING },
		password: { type: DataTypes.STRING },
		createdAt: {
			allowNull: false,
			type: DataTypes.DATE,
		},
		updatedAt: {
			allowNull: false,
			type: DataTypes.DATE,
		},
	},
	{
		sequelize,
		modelName: "User",
		tableName: "Users",
		timestamps: true,
	},
);

export default User;
