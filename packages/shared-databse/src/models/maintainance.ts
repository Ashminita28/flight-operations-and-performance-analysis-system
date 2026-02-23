import { Model, DataTypes } from "sequelize";
import sequelize from "../config/sequelize-connection";
class Maintainance extends Model {
	/**
	 * Helper method for defining associations.
	 * This method is not a part of Sequelize lifecycle.
	 * The `models/index` file will call this method automatically.
	 */
	// static associate(models) {
	//   // define association here
	// }
}
Maintainance.init(
	{
		departure_airport: DataTypes.STRING,
		arrival_airport: DataTypes.STRING,
	},
	{
		sequelize,
		modelName: "Maintainance",
	},
);
export default Maintainance;
