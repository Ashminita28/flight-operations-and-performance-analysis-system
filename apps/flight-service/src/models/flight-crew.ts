import sequelize from "../config/db-connections";
import { Model, DataTypes } from "sequelize";
class FlightCrew extends Model {
	declare id: string;
	declare flight_id: string;
	declare crew_id: string;
	declare readonly created_at: Date;
	declare readonly updated_at: Date;
}
FlightCrew.init(
	{
		id: {
			allowNull: false,
			primaryKey: true,
			type: DataTypes.UUID,
		},
		flight_id: {
			type: DataTypes.UUID,
		},
		crew_id: {
			type: DataTypes.UUID,
		},
	},
	{
		sequelize,
		modelName: "FlightCrew",
		timestamps: true,
	},
);
export default FlightCrew;
