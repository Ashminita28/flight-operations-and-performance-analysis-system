import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../sequelize-connection";

interface RoleAttributes {
	id: string;
	name: string;
	description?: string;
	createdAt?: Date;

	updatedAt?: Date;
}

type RoleCreationAttributes = Optional<
	RoleAttributes,
	"id" | "createdAt" | "updatedAt"
>;

export class Role
	extends Model<RoleAttributes, RoleCreationAttributes>
	implements RoleAttributes
{
	declare id: string;
	declare name: string;
	declare description?: string;
	declare createdAt: Date;

	declare updatedAt: Date;
}

Role.init(
	{
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4,
		},

		name: {
			type: DataTypes.STRING(50),
			allowNull: false,
			unique: true,
		},

		description: DataTypes.TEXT,
	},
	{
		sequelize,
		tableName: "roles",
		timestamps: true,
	},
);
