import { Model, DataTypes } from "sequelize";
import sequelize from "../sequelize-connection";

export class Flight extends Model {
	declare id: string;

	declare flight_number: string;

	declare aircraft_id: string | null;

	declare departure_airport: string;

	declare arrival_airport: string;

	declare departure_date: Date;

	declare departure_datetime: Date;

	declare arrival_datetime: Date;

	declare status: string;

	declare readonly created_at: Date;
	declare readonly updated_at: Date;
}

Flight.init(
	{
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4,
		},

		flight_number: DataTypes.STRING,

		aircraft_id: DataTypes.UUID,

		departure_airport: DataTypes.STRING,

		arrival_airport: DataTypes.STRING,

		departure_date: DataTypes.DATEONLY,

		departure_datetime: DataTypes.TIME,

		arrival_datetime: DataTypes.TIME,

		status: DataTypes.ENUM("Scheduled", "Delayed", "Cancelled", "Completed"),
	},
	{
		sequelize,
		tableName: "Flights",
		timestamps: true,
		underscored: true,
	},
);
