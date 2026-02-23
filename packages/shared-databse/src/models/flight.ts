import { Model, DataTypes } from "sequelize";
import sequelize from "../config/sequelize-connection";

class Flight extends Model {}

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
		airpot_id: {
			type: DataTypes.UUID,
		},
		// flight_number: { type: DataTypes.STRING, allowNull: false },
		flight_model: {
			type: DataTypes.STRING,
		},
		departure_date: { type: DataTypes.DATEONLY },
		departure_time: { type: DataTypes.TIME },
		arrival_time: { type: DataTypes.TIME },
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
