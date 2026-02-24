import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db-connection";

export class AircraftMaintenance extends Model {
	declare id: string;
	declare aircraft_id: string;
	declare maintenance_type: string;
	declare description: string;
	declare performed_at: Date;
	declare status: string;
	declare readonly created_at: Date;
	declare readonly updated_at: Date;
}

AircraftMaintenance.init(
	{
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4,
		},
		aircraft_id: {
			type: DataTypes.UUID,
			allowNull: false,
		},
		maintenance_type: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		description: DataTypes.TEXT,
		next_due_at: DataTypes.DATE,
		status: {
			type: DataTypes.STRING,
			defaultValue: "COMPLETED",
		},
	},
	{
		sequelize,
		tableName: "aircraft_maintenance",
		timestamps: true,
		createdAt: "created_at",
		updatedAt: "updated_at",
	},
);
