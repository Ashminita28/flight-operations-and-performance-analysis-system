import sequelize from "../config/db-connections";
import { Model, DataTypes } from "sequelize";
class Crew extends Model {
	declare id: string;
	declare crew_name: string;
	declare contact_info: string;
	declare position: string;
	declare readonly created_at: Date;
	declare readonly updated_at: Date;
}
Crew.init(
	{
		id: {
			allowNull: false,
			primaryKey: true,
			type: DataTypes.UUID,
		},
		crew_name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		contact_info: {
			type: DataTypes.STRING,
		},
		position: {
			type: DataTypes.STRING,
		},
	},
	{
		sequelize,
		modelName: "Crew",
		timestamps: true,
	},
);
export default Crew;
