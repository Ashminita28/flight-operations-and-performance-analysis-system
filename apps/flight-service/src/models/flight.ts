import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db-connections";

class Flight extends Model {
	declare id: string;
	declare aircraft_id: string;
	declare departure_airport: string;
	declare arrival_airport: string;
	declare flight_number: string;
	declare departure_date: Date;
	declare departure_datetime: TimeRanges;
	declare arrival_datetime: TimeRanges;
	declare status: string;
	declare readonly created_at: Date;
	declare readonly updated_at: Date;
}

Flight.init(
	{
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER,
		},
		aircraft_id: {
			type: DataTypes.UUID,
		},
		departure_airport: {
			type: DataTypes.STRING,
		},
		arrival_airport: {
			type: DataTypes.STRING,
		},
		flight_number: { type: DataTypes.STRING, allowNull: false },
		departure_date: { type: DataTypes.DATEONLY },
		departure_datetime: { type: DataTypes.TIME },
		arrival_datetime: { type: DataTypes.TIME },
		status: {
			type: DataTypes.ENUM("Scheduled", "Delayed", "Cancelled", "Completed"),
			defaultValue: "Scheduled",
		},
	},
	{
		sequelize,
		modelName: "Flight",
		timestamps: true,
	},
);

export default Flight;
