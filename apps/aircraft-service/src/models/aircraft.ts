import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db-connection";

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
		registration_number: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		model: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		manufacturer: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		capacity: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		manufacture_year: DataTypes.INTEGER,
		total_flight_hours: {
			type: DataTypes.DECIMAL(10, 2),
			defaultValue: 0,
		},
		is_active: {
			type: DataTypes.BOOLEAN,
			defaultValue: true,
		},
		last_maintenance_date: DataTypes.DATE,
		next_maintenance_date: DataTypes.DATE,
		notes: DataTypes.TEXT,
	},
	{
		sequelize,
		tableName: "aircraft",
		timestamps: true,
		createdAt: "created_at",
		updatedAt: "updated_at",
	},
);
