import sequelize from "../config/sequelize-connection";
import { Model, DataTypes } from "sequelize";
class FlightCrew extends Model {
	/**
	 * Helper method for defining associations.
	 * This method is not a part of Sequelize lifecycle.
	 * The `models/index` file will call this method automatically.
	 */
	// static associate(models) {
	//   // define association here
	// }
}
FlightCrew.init(
	{
		departure_airport: DataTypes.STRING,
		arrival_airport: DataTypes.STRING,
	},
	{
		sequelize,
		modelName: "FlightCrew",
	},
);
export default FlightCrew;
