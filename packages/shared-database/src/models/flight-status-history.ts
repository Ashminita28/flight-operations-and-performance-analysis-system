import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../sequelize-connection";

interface FlightStatusAttributes {
	id: string;
	flight_id: string;
	previous_status: string;
	new_status: string;
	changed_at: Date;
	changed_by: string;
	reason: string;
	createdAt?: Date;
	updatedAt?: Date;
}

type FlightStatusCreationAttributes = Optional<
	FlightStatusAttributes,
	"id" | "createdAt" | "updatedAt"
>;

export class FlightStatusHistory
	extends Model<FlightStatusAttributes, FlightStatusCreationAttributes>
	implements FlightStatusAttributes
{
	declare id: string;
	declare flight_id: string;
	declare previous_status: string;
	declare new_status: string;
	declare changed_at: Date;
	declare changed_by: string;
	declare reason: string;
	declare createdAt: Date;
	declare updatedAt: Date;
}
FlightStatusHistory.init(
	{
		id: {
			type: DataTypes.UUID,
			allowNull: false,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4,
		},
		flight_id: {
			type: DataTypes.UUID,
		},
		previous_status: {
			type: DataTypes.STRING(30),
		},
		new_status: {
			type: DataTypes.STRING(30),
			allowNull: false,
		},
		changed_at: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW,
		},
		changed_by: {
			type: DataTypes.UUID,
		},
		reason: {
			type: DataTypes.TEXT,
		},
	},
	{
		sequelize,
		tableName: "flight_status_histories",
		timestamps: true,
	},
);
