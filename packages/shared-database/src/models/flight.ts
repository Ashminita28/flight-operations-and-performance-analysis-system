import { Model, DataTypes } from "sequelize";
import sequelize from "../sequelize-connection";

export class Flight extends Model {
	declare id: string;

	declare flight_number: string;

	declare aircraft_id: string | null;

	declare departure_airport: string;

	declare arrival_airport: string;

	declare departure_date: Date;

	declare planned_departure_time: Date;

	declare planned_arrival_time: Date;

	declare actual_departure_time: Date;

	declare actual_arrival_time: Date;

	declare status: string;

	declare delay_minutes: number;

	declare fuel_used: number;

	declare payload_weight: number;

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

		planned_departure_time: DataTypes.TIME,

		planned_arrival_time: DataTypes.TIME,

		actual_departure_time: DataTypes.TIME,

		actual_arrival_time: DataTypes.TIME,

		status: DataTypes.STRING,

		delay_minutes: DataTypes.INTEGER,

		fuel_used: DataTypes.DECIMAL,

		payload_weight: DataTypes.DECIMAL,
	},
	{
		sequelize,
		tableName: "Flights",
		timestamps: true,
		underscored: true,
	},
);
