import { Model, DataTypes, Optional, DecimalDataType } from "sequelize";
import sequelize from "../sequelize-connection";

interface FlightPerformanceAttributes {
	id: string;
	flight_id: string;
	fuel_planned_kg: number;
	fuel_uplifted_kg: number;
	fuel_used_kg: number;
	fuel_remaining_kg: number;
	fuel_efficiency_kg_per_km: number;
	block_time_minutes: number;
	flight_time_minutes: number;
	distance_km: number;
	passengers_count: number;
	cargo_weight_kg: number;
	payload_kg: number;
	load_factor_pct: number;
	cruise_altitude_ft: number;
	average_speed_kmh: number;
	landing_weight_kg: number;
	takeoff_weight_kg: number;
	co2_emissions_kg: DecimalDataType;
	entered_by: string;
	createdAt?: Date;
	updatedAt?: Date;
}

type FlightPerformanceCreationAttribute = Optional<
	FlightPerformanceAttributes,
	"id" | "createdAt" | "updatedAt"
>;
export class FlightPerformance
	extends Model<FlightPerformanceAttributes, FlightPerformanceCreationAttribute>
	implements FlightPerformanceAttributes
{
	declare id: string;
	declare flight_id: string;
	declare fuel_planned_kg: number;
	declare fuel_uplifted_kg: number;
	declare fuel_used_kg: number;
	declare fuel_remaining_kg: number;
	declare fuel_efficiency_kg_per_km: number;
	declare block_time_minutes: number;
	declare flight_time_minutes: number;
	declare distance_km: number;
	declare passengers_count: number;
	declare cargo_weight_kg: number;
	declare payload_kg: number;
	declare load_factor_pct: number;
	declare cruise_altitude_ft: number;
	declare average_speed_kmh: number;
	declare landing_weight_kg: number;
	declare takeoff_weight_kg: number;
	declare co2_emissions_kg: DecimalDataType;
	declare entered_by: string;
	declare createdAt?: Date;
	declare updatedAt?: Date;
}
FlightPerformance.init(
	{
		id: {
			type: DataTypes.UUID,
			allowNull: false,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4,
		},
		flight_id: {
			type: DataTypes.UUID,
			unique: true,
		},
		fuel_planned_kg: DataTypes.DECIMAL,
		fuel_uplifted_kg: DataTypes.DECIMAL,
		fuel_used_kg: DataTypes.DECIMAL,
		fuel_remaining_kg: DataTypes.DECIMAL,
		fuel_efficiency_kg_per_km: DataTypes.DECIMAL,
		block_time_minutes: DataTypes.INTEGER,
		flight_time_minutes: DataTypes.INTEGER,
		distance_km: DataTypes.DECIMAL,
		passengers_count: DataTypes.INTEGER,
		cargo_weight_kg: DataTypes.DECIMAL,
		payload_kg: DataTypes.DECIMAL,
		load_factor_pct: DataTypes.DECIMAL,
		cruise_altitude_ft: DataTypes.INTEGER,
		average_speed_kmh: DataTypes.DECIMAL,
		landing_weight_kg: DataTypes.DECIMAL,
		takeoff_weight_kg: DataTypes.DECIMAL,
		co2_emissions_kg: DataTypes.DECIMAL,
		entered_by: DataTypes.UUID,
	},
	{
		sequelize,
		modelName: "flight_performances",
		timestamps: true,
	},
);
