import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../sequelize-connection";

interface FlightAttributes {
	id: string;
	flight_number: string;
	airline_code: string;
	origin_airport: string;
	destination_airport: string;
	aircraft_id: string;
	status: string;
	scheduled_departure: string;
	scheduled_arrival: string;
	estimated_departure: string;
	estimated_arrival: string;
	actual_departure: string;
	actual_arrival: string;
	gate_departure: string;
	gate_arrival: string;
	flight_date: Date;
	is_return_flight: boolean;
	created_by: string;
	createdAt?: Date;

	updatedAt?: Date;
}

type FlightCreationAttributes = Optional<
	FlightAttributes,
	"id" | "createdAt" | "updatedAt"
>;
export class Flight
	extends Model<FlightAttributes, FlightCreationAttributes>
	implements FlightAttributes
{
	declare id: string;
	declare flight_number: string;
	declare airline_code: string;
	declare origin_airport: string;
	declare destination_airport: string;
	declare aircraft_id: string;
	declare status: string;
	declare scheduled_departure: string;
	declare scheduled_arrival: string;
	declare estimated_departure: string;
	declare estimated_arrival: string;
	declare actual_departure: string;
	declare actual_arrival: string;
	declare gate_departure: string;
	declare gate_arrival: string;
	declare flight_date: Date;
	declare is_return_flight: boolean;
	declare created_by: string;
	declare createdAt: Date;

	declare updatedAt: Date;
}

Flight.init(
	{
		id: {
			type: DataTypes.UUID,
			allowNull: false,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4,
		},
		flight_number: {
			type: DataTypes.STRING(20),
			allowNull: false,
		},
		airline_code: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		origin_airport: {
			type: DataTypes.STRING(10),
			allowNull: false,
		},
		destination_airport: {
			type: DataTypes.STRING,
		},
		aircraft_id: {
			type: DataTypes.UUID,
			allowNull: false,
		},
		status: {
			type: DataTypes.ENUM(
				"scheduled",
				"boarding",
				"departed",
				"landed",
				"diverted",
				"cancelled",
				"delayed",
			),
			allowNull: false,
		},
		scheduled_departure: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		scheduled_arrival: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		estimated_departure: {
			type: DataTypes.DATE,
		},
		estimated_arrival: {
			type: DataTypes.DATE,
		},
		actual_departure: {
			type: DataTypes.DATE,
		},
		actual_arrival: {
			type: DataTypes.DATE,
		},
		gate_departure: {
			type: DataTypes.STRING,
		},
		gate_arrival: {
			type: DataTypes.STRING,
		},
		flight_date: {
			type: DataTypes.DATEONLY,
			allowNull: false,
		},
		is_return_flight: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
		},
		created_by: {
			type: DataTypes.UUID,
		},
	},
	{
		sequelize,
		tableName: "flights",
		timestamps: true,
	},
);
