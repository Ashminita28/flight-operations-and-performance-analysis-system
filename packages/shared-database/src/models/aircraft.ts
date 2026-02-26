import { Model, DataTypes } from "sequelize";
import sequelize from "../sequelize-connection";

export class Aircraft extends Model {
	declare id: string;

	declare registration_number: string;

	declare model: string;

	declare manufacturer: string;

	declare capacity: number;

	declare manufacture_year: number;

	declare total_flight_hours: number;

	declare is_active: boolean;

	declare last_maintenance_date: Date;

	declare next_maintenance_date: Date;

	declare notes: string;

	declare readonly created_at: Date;
	declare readonly updated_at: Date;
}

Aircraft.init(
	{
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4,
		},

		registration_number: DataTypes.STRING,

		model: DataTypes.STRING,

		manufacturer: DataTypes.STRING,

		capacity: DataTypes.INTEGER,

		manufacture_year: DataTypes.INTEGER,

		total_flight_hours: DataTypes.DECIMAL,

		is_active: DataTypes.BOOLEAN,

		last_maintenance_date: DataTypes.DATE,

		next_maintenance_date: DataTypes.DATE,

		notes: DataTypes.TEXT,
	},
	{
		sequelize,
		tableName: "Aircraft",
		timestamps: true,
		underscored: true,
	},
);
