import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../sequelize-connection";

interface AnalyticsSummaryAttributes {
	id: string;
	date: string;
	route: string;
	aircraft_id: string;
	total_flights: number;
	delayed_flights: number;
	avg_delay_minutes: number;
	total_flight_hours: number;
	createdAt?: Date;
	updatedAt?: Date;
}

type AnalyticsSummaryCreationAttributes = Optional<
	AnalyticsSummaryAttributes,
	"id" | "createdAt" | "updatedAt"
>;

export class AnalyticsSummary
	extends Model<AnalyticsSummaryAttributes, AnalyticsSummaryCreationAttributes>
	implements AnalyticsSummaryAttributes
{
	declare id: string;
	declare date: string;
	declare route: string;
	declare aircraft_id: string;
	declare total_flights: number;
	declare delayed_flights: number;
	declare avg_delay_minutes: number;
	declare total_flight_hours: number;
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
		route: {
			type: DataTypes.STRING,
			allowNull: false,
		},
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
	},
	{
		sequelize,
		tableName: "analytics_summary",
		timestamps: true,
	},
);
