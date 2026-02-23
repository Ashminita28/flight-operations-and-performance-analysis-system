import { Model, DataTypes } from "sequelize";
import sequelize from "../config/sequelize-connection";
class Route extends Model {
	/**
	 * Helper method for defining associations.
	 * This method is not a part of Sequelize lifecycle.
	 * The `models/index` file will call this method automatically.
	 */
	// static associate(models) {
	//   // define association here
	// }
}
Route.init(
	{
		departure_airport: DataTypes.STRING,
		arrival_airport: DataTypes.STRING,
	},
	{
		sequelize,
		modelName: "Route",
	},
);
export default Route;
