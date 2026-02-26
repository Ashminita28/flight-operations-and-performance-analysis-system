import { Model, DataTypes } from "sequelize";
import sequelize from "../sequelize-connection";

export class Crew extends Model {
	declare id: string;

	declare crew_name: string;

	declare position: string;

	declare contact_info: string;

	declare readonly created_at: Date;
	declare readonly updated_at: Date;
}

Crew.init(
	{
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4,
		},

		crew_name: DataTypes.STRING,

		position: DataTypes.STRING,

		contact_info: DataTypes.STRING,
	},
	{
		sequelize,
		tableName: "Crews",
		timestamps: true,
		underscored: true,
	},
);
