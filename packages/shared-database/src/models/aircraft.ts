import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../sequelize-connection";

interface AircraftAttributes {
	id: string;

	registration: string;

	icao_type: string;

	manufacturer: string;

	model: string;

	seat_capacity: number;

	fuel_capacity_kg: string;

	max_payload_kg: string;

	year_of_manufacture: number;

	status: string;

	base_airport_code: string;

	notes?: string;

	createdAt?: Date;

	updatedAt?: Date;
}

type AircraftCreationAttributes = Optional<
	AircraftAttributes,
	"id" | "createdAt" | "updatedAt"
>;

export class Aircraft
	extends Model<AircraftAttributes, AircraftCreationAttributes>
	implements AircraftAttributes
{
	declare id: string;

	declare registration: string;

	declare icao_type: string;

	declare manufacturer: string;

	declare model: string;

	declare seat_capacity: number;

	declare fuel_capacity_kg: string;

	declare max_payload_kg: string;

	declare year_of_manufacture: number;

	declare status: string;

	declare base_airport_code: string;

	declare notes?: string;

	declare createdAt: Date;

	declare updatedAt: Date;
}
Aircraft.init(
	{
		id: {
			type: DataTypes.UUID,
			allowNull: false,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4,
		},
		registration: {
			type: DataTypes.STRING(20),
			allowNull: false,
			unique: true,
		},
		icao_type: {
			type: DataTypes.STRING(10),
			allowNull: false,
		},
		manufacturer: {
			type: DataTypes.STRING(100),
			allowNull: false,
		},
		model: {
			type: DataTypes.STRING(100),
			allowNull: false,
		},
		seat_capacity: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		fuel_capacity_kg: {
			type: DataTypes.DECIMAL(10, 2),
			allowNull: false,
		},
		max_payload_kg: {
			type: DataTypes.DECIMAL(10, 2),
			allowNull: false,
		},
		year_of_manufacture: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		status: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		base_airport_code: {
			type: DataTypes.STRING(10),
		},
		notes: {
			type: DataTypes.TEXT,
		},
	},
	{
		sequelize,
		tableName: "aircraft",
		timestamps: true,
	},
);
