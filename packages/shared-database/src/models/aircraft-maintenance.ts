// import { Model, DataTypes } from "sequelize";
// import sequelize from "../sequelize-connection";

// export class AircraftMaintenance extends Model {
// 	declare id: string;

// 	declare aircraft_id: string;

// 	declare maintenance_type: string;

// 	declare description: string;

// 	declare next_due_at: Date;

// 	declare status: string;

// 	declare readonly created_at: Date;
// 	declare readonly updated_at: Date;
// }

// AircraftMaintenance.init(
// 	{
// 		id: {
// 			type: DataTypes.UUID,
// 			primaryKey: true,
// 			defaultValue: DataTypes.UUIDV4,
// 		},

// 		aircraft_id: DataTypes.UUID,

// 		maintenance_type: DataTypes.STRING,

// 		description: DataTypes.TEXT,

// 		next_due_at: DataTypes.DATE,

// 		status: DataTypes.STRING,
// 	},
// 	{
// 		sequelize,
// 		tableName: "AircraftMaintenance",
// 		timestamps: true,
// 		underscored: true,
// 	},
// );
