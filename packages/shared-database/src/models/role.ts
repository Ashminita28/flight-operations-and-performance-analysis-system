import { Model, DataTypes } from "sequelize";
import sequelize from "../sequelize-connection";

export class Role extends Model {
	declare id: string;
	declare name: string;

	declare readonly created_at: Date;
	declare readonly updated_at: Date;
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
	},
	{
		sequelize,
		tableName: "Roles",
		timestamps: true,
		underscored: true,
	},
);
