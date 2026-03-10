import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../sequelize-connection";

interface AnalyticsSummaryAttributes {
	id: string;
	date: string;
	origin_airport: string;
	destination_airport: string;
	delay_category?: string;
	aircraft_id: string;
	total_flights: number;
	delayed_flights: number;
	avg_delay_minutes: number;
	total_flight_hours: number;
	avg_fuel_efficiency: number;
	avg_load_factor_pct: number;
	createdAt?: Date;
	updatedAt?: Date;
}

type AnalyticsSummaryCreationAttributes = Optional<
	AnalyticsSummaryAttributes,
	"id" | "createdAt" | "updatedAt" | "delay_category"
>;

export class AnalyticsSummary
	extends Model<AnalyticsSummaryAttributes, AnalyticsSummaryCreationAttributes>
	implements AnalyticsSummaryAttributes
{
	declare id: string;
	declare date: string;
	declare origin_airport: string;
	declare destination_airport: string;
	declare delay_category: string;
	declare aircraft_id: string;
	declare total_flights: number;
	declare delayed_flights: number;
	declare avg_delay_minutes: number;
	declare total_flight_hours: number;
	declare avg_fuel_efficiency: number;
	declare avg_load_factor_pct: number;
	declare createdAt: Date;
	declare updatedAt: Date;
}

AnalyticsSummary.init(
	{
		id: {
			type: DataTypes.UUID,
			allowNull: false,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4,
		},
		date: {
			type: DataTypes.DATEONLY,
			allowNull: false,
		},
		origin_airport: {
			type: DataTypes.STRING(10),
			allowNull: false,
		},
		destination_airport: {
			type: DataTypes.STRING,
		},
		delay_category: DataTypes.STRING,

		aircraft_id: {
			type: DataTypes.UUID,
			allowNull: false,
		},
		total_flights: {
			type: DataTypes.INTEGER,
			defaultValue: 0,
		},
		delayed_flights: {
			type: DataTypes.INTEGER,
			defaultValue: 0,
		},
		avg_delay_minutes: {
			type: DataTypes.FLOAT,
			defaultValue: 0,
		},
		total_flight_hours: {
			type: DataTypes.FLOAT,
			defaultValue: 0,
		},
		avg_fuel_efficiency: {
			type: DataTypes.FLOAT,
			allowNull: false,
		},
		avg_load_factor_pct: {
			type: DataTypes.FLOAT,
		},
	},
	{
		sequelize,
		tableName: "analytics_summary",
		timestamps: true,
	},
);
