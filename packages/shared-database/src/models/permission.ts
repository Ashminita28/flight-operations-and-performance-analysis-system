import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../sequelize-connection";

interface PermissionAttributes {
	id: string;
	resource: string;
	action: string;
	description: string;
	createdAt?: Date;
	updatedAt?: Date;
}

type PermissionCreationAttributes = Optional<
	PermissionAttributes,
	"id" | "description" | "createdAt" | "updatedAt"
>;

export class Permission
	extends Model<PermissionAttributes, PermissionCreationAttributes>
	implements PermissionAttributes
{
	declare id: string;
	declare resource: string;
	declare action: string;
	declare description: string;
	declare createdAt: Date;

	declare updatedAt: Date;
}

Permission.init(
	{
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4,
		},

		resource: {
			type: DataTypes.STRING(100),
			allowNull: false,
		},

		action: {
			type: DataTypes.STRING(50),
			allowNull: false,
		},

		description: DataTypes.TEXT,
	},
	{
		sequelize,
		tableName: "permissions",
		timestamps: true,
	},
);
