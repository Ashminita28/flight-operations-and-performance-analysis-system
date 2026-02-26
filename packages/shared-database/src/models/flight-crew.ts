import { Model, DataTypes } from "sequelize";
import sequelize from "../sequelize-connection";

export class FlightCrew extends Model {
	declare id: string;

	declare flight_id: string;

	declare crew_id: string;

	declare readonly created_at: Date;
	declare readonly updated_at: Date;
}

FlightCrew.init(
	{
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4,
		},

		flight_id: DataTypes.UUID,

		crew_id: DataTypes.UUID,
	},
	{
		sequelize,
		tableName: "FlightCrews",
		timestamps: true,
		underscored: true,
	},
);
