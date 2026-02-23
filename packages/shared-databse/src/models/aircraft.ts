import sequelize from "../config/sequelize-connection";
import { Model, DataTypes } from "sequelize";
class Aircraft extends Model {
	/**
	 * Helper method for defining associations.
	 * This method is not a part of Sequelize lifecycle.
	 * The `models/index` file will call this method automatically.
	 */
	// static associate(models) {
	//   // define association here
	// }
}
Aircraft.init(
	{
		aircraft_model: DataTypes.STRING,
		maintenance_status: DataTypes.STRING,
	},
	{
		sequelize,
		modelName: "Aircraft",
	},
);
export default Aircraft;
