import { Model, DataTypes } from "sequelize";
import sequelize from "../sequelize-connection";

export class Role extends Model {
	declare id: string;
	declare name: string;
	declare description: string;

	declare readonly createdAt: Date;
	declare readonly updatedAt: Date;
}

Role.init(
	{
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4,
		},

		name: {
			type: DataTypes.STRING,
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
