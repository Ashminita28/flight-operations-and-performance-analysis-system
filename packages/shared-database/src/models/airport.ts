import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../sequelize-connection";

interface AirportAttributes {
	iata_code: string;
	icao_code: string;
	name: string;
	city: string;
	country: string;
	timezone: string;
	latitude: string;
	longitude: string;
	elevation_ft: number;
	is_active: boolean;
	createdAt?: Date;

	updatedAt?: Date;
}

type AirportCreationAttributes = Optional<
	AirportAttributes,
	"iata_code" | "createdAt" | "updatedAt"
>;

export class Airport
	extends Model<AirportAttributes, AirportCreationAttributes>
	implements AirportAttributes
{
	declare iata_code: string;
	declare icao_code: string;
	declare name: string;
	declare city: string;
	declare country: string;
	declare timezone: string;
	declare latitude: string;
	declare longitude: string;
	declare elevation_ft: number;
	declare is_active: boolean;
	declare createdAt: Date;

	declare updatedAt: Date;
}

Airport.init(
	{
		iata_code: {
			type: DataTypes.STRING(3),
			allowNull: false,
			primaryKey: true,
		},
		icao_code: {
			type: DataTypes.STRING(4),
			unique: true,
		},
		name: {
			type: DataTypes.STRING(200),
			allowNull: false,
		},
		city: {
			type: DataTypes.STRING(100),
			allowNull: false,
		},
		country: {
			type: DataTypes.STRING(100),
			allowNull: false,
		},
		timezone: {
			type: DataTypes.STRING(50),
			allowNull: false,
		},
		latitude: {
			type: DataTypes.DECIMAL(10, 6),
			allowNull: false,
		},
		longitude: {
			type: DataTypes.DECIMAL(10, 6),
			allowNull: false,
		},
		elevation_ft: {
			type: DataTypes.INTEGER,
		},
		is_active: {
			type: DataTypes.BOOLEAN,
			defaultValue: true,
		},
	},
	{
		sequelize,
		tableName: "airports",
		timestamps: true,
	},
);
