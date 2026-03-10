import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../sequelize-connection";
interface AnalyticsAttributes {
	id: string;
	job_type: string;
	status: string;
	parameters: object;
	result_summary: object;
	error_message: string;
	started_at: Date;
	completed_at: Date;
	triggered_by: string;
	createdAt?: Date;
	updatedAt?: Date;
}
type AnalyticsCreationAttributes = Optional<
	AnalyticsAttributes,
	"id" | "createdAt" | "updatedAt"
>;

export class Analytics
	extends Model<AnalyticsAttributes, AnalyticsCreationAttributes>
	implements AnalyticsAttributes
{
	declare id: string;
	declare job_type: string;
	declare status: string;
	declare parameters: object;
	declare result_summary: object;
	declare error_message: string;
	declare started_at: Date;
	declare completed_at: Date;
	declare triggered_by: string;
	declare createdAt: Date;
	declare updatedAt: Date;
}
Analytics.init(
	{
		id: {
			type: DataTypes.UUID,
			allowNull: false,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4,
		},
		job_type: {
			type: DataTypes.STRING(100),
		},
		status: {
			type: DataTypes.STRING,
		},
		parameters: {
			type: DataTypes.JSON,
		},
		result_summary: {
			type: DataTypes.JSON,
		},
		error_message: {
			type: DataTypes.TEXT,
		},
		started_at: {
			type: DataTypes.DATE,
		},
		completed_at: {
			type: DataTypes.DATE,
		},
		triggered_by: {
			type: DataTypes.UUID,
			references: {
				model: "users",
				key: "id",
			},
			onDelete: "RESTRICT",
			onUpdate: "CASCADE",
		},
	},
	{
		sequelize,
		tableName: "analytics",
		timestamps: true,
	},
);
