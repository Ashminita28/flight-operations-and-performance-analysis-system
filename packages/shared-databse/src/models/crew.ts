import sequelize from "../config/sequelize-connection";
import { Model, DataTypes } from "sequelize";
class Crew extends Model {
	/**
	 * Helper method for defining associations.
	 * This method is not a part of Sequelize lifecycle.
	 * The `models/index` file will call this method automatically.
	 */
	// static associate(models) {
	//   // define association here
	// }
}
Crew.init(
	{
		departure_airport: DataTypes.STRING,
		arrival_airport: DataTypes.STRING,
	},
	{
		sequelize,
		modelName: "Crew",
	},
);
export default Crew;
