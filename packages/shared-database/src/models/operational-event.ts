import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../sequelize-connection";

interface OperationalEventAttributes {
	id: string;
	flight_id: string;
	event_type: string;
	delay_category_id: string;
	delay_minutes: string;
	description: string;
	event_time: Date;
	resolved_at: Date;
	severity: string;
	reported_by: string;
	createdAt?: Date;
	updatedAt?: Date;
}

type OperationalEventCreationAttributes = Optional<
	OperationalEventAttributes,
	"id" | "createdAt" | "updatedAt"
>;

export class OperationalEvent
	extends Model<OperationalEventAttributes, OperationalEventCreationAttributes>
	implements OperationalEventAttributes
{
	declare id: string;
	declare flight_id: string;
	declare event_type: string;
	declare delay_category_id: string;
	declare delay_minutes: string;
	declare description: string;
	declare event_time: Date;
	declare resolved_at: Date;
	declare severity: string;
	declare reported_by: string;
	declare createdAt: Date;
	declare updatedAt: Date;
}
OperationalEvent.init(
	{
		id: {
			type: DataTypes.UUID,
			allowNull: false,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4,
		},
		flight_id: DataTypes.UUID,

		event_type: DataTypes.STRING,
		delay_category_id: DataTypes.UUID,

		delay_minutes: DataTypes.INTEGER,

		description: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		event_time: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		resolved_at: DataTypes.DATE,
		severity: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		reported_by: DataTypes.UUID,
	},
	{
		sequelize,
		tableName: "operational_events",
		timestamps: true,
	},
);
