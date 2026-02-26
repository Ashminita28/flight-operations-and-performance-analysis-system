import { Model, DataTypes } from "sequelize";
import sequelize from "../sequelize-connection";

export class FlightEvent extends Model {
	declare id: string;

	declare flight_id: string;

	declare event_type: string;

	declare description: string;

	declare event_time: Date;

	declare readonly created_at: Date;
	declare readonly updated_at: Date;
}

FlightEvent.init(
	{
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4,
		},

		flight_id: DataTypes.UUID,

		event_type: DataTypes.STRING,

		description: DataTypes.TEXT,

		event_time: DataTypes.DATE,
	},
	{
		sequelize,
		tableName: "FlightEvents",
		timestamps: true,
		underscored: true,
	},
);
