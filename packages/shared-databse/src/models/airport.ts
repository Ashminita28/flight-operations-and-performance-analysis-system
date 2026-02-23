import sequelize from "../config/sequelize-connection";
import { Model, DataTypes } from "sequelize";
class Airport extends Model {
	/**
	 * Helper method for defining associations.
	 * This method is not a part of Sequelize lifecycle.
	 * The `models/index` file will call this method automatically.
	 */
	// static associate(models) {
	//   // define association here
	// }
}
Airport.init(
	{
		airport_name: DataTypes.STRING,
	},
	{
		sequelize,
		modelName: "Airport",
	},
);

export default Airport;
